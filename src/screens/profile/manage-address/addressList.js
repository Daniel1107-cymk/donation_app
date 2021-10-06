import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import Toast from 'react-native-toast-message';
// component
import AddressItem from '../../../components/profile/manage-address/addressItem';
import Skeleton from '../../../components/profile/manage-address/skeleton';
// helper
import {get, remove} from '../../../helpers/network';
import {forceLogout} from '../../../helpers/logout';
// style
import {Mixins} from '../../../assets/mixins';

const AddressList = props => {
  const [addressList, setAddressList] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
    isShowOverlay: false,
  });

  const getAddress = async () => {
    const result = await get('address');
    if (result.success) {
      setAddressList(result.data);
      setFlag(prevFlag => ({
        ...prevFlag,
        isLoading: false,
      }));
    } else {
      if (result.status === 401 && result.redirect === true) {
        await forceLogout({navigation: props.navigation});
      }
    }
  };

  const toggleOverlay = data => {
    setSelectedAddress(data);
    setFlag(prevFlag => ({
      ...prevFlag,
      isShowOverlay: !flag.isShowOverlay,
    }));
  };

  const deleteAddress = async ({action}) => {
    if (action) {
      const result = await remove(`delete-address/${selectedAddress._id}`);
      console.log(result);
      if (result.success) {
        getAddress();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Address successfully deleted',
          visibilityTime: 1000,
          autoHide: true,
          bottomOffset: 20,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Something went wrong, try again!',
          visibilityTime: 1000,
          autoHide: true,
          bottomOffset: 20,
        });
      }
    }
    toggleOverlay(null);
  };

  const navigateToAddressForm = () => {
    props.navigation.navigate('AddressForm');
  };

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      await getAddress();
    });
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Address List</Text>
            <Button
              title="+ new address"
              buttonStyle={styles.button}
              onPress={navigateToAddressForm}
            />
          </View>
          <FlatList
            data={addressList}
            renderItem={({item}) => (
              <AddressItem item={item} toggleOverlay={toggleOverlay} />
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <Overlay visible={flag.isShowOverlay}>
        <View style={{padding: 10}}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            This action will delete current address
          </Text>
          {selectedAddress !== null && (
            <Text style={{marginBottom: 20, textAlign: 'center'}}>
              {selectedAddress.address}
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              type="clear"
              title="No"
              buttonStyle={styles.buttonNo}
              titleStyle={{color: Mixins.bgHeader}}
              onPress={() => deleteAddress({action: false})}
            />
            <Button
              title="Yes"
              buttonStyle={styles.buttonYes}
              onPress={() => deleteAddress({action: true})}
            />
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    backgroundColor: Mixins.bgButtonPrimary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  buttonYes: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: Mixins.bgHeader,
    borderRadius: 5,
  },
  buttonNo: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Mixins.bgHeader,
    borderRadius: 5,
  },
});

export default AddressList;

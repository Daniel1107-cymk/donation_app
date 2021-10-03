import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
// component
import AddressItem from '../../../components/profile/manage-address/addressItem';
import Skeleton from '../../../components/profile/manage-address/skeleton';
// helper
import {get} from '../../../helpers/network';
import {forceLogout} from '../../../helpers/logout';
// style
import {Mixins} from '../../../assets/mixins';

const AddressList = () => {
  const [addressList, setAddressList] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
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

  useEffect(async () => {
    await getAddress();
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Address List</Text>
            <Button title="+ new address" buttonStyle={styles.button} />
          </View>
          <FlatList
            data={addressList}
            renderItem={({item}) => <AddressItem item={item} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
});

export default AddressList;

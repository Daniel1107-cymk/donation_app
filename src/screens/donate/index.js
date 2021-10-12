import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// screen
import FirstDonateForm from './firstForm';
import SecondDonateForm from './secondForm';
// helper
import {post, get} from '../../helpers/network';
import Session from '../../helpers/session';
// style
import {Mixins} from '../../assets/mixins';

const Donate = ({navigation}) => {
  const [steps, setSteps] = useState(1);
  const [addressList, setAddressList] = useState(null);
  const [firstForm, setFirstForm] = useState({
    recipientName: '',
    phoneNumber: '',
    category: '',
  });
  const [secondForm, setSecondForm] = useState({
    selectedAddressListIndex: null,
    addressId: null,
  });

  const getAddress = async () => {
    const result = await get('address');
    if (result.success) {
      setAddressList(result.data);
    } else {
      if (result.status === 401 && result.redirect === true) {
        await forceLogout({navigation: props.navigation});
      }
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAddress();
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {steps === 1 && (
        <View style={styles.formContainer}>
          <FirstDonateForm
            firstForm={firstForm}
            navigation={navigation}
            steps={steps}
            setSteps={setSteps}
            setFirstForm={setFirstForm}
            addressList={addressList}
          />
        </View>
      )}
      {steps === 2 && (
        <SecondDonateForm
          navigation={navigation}
          secondForm={secondForm}
          steps={steps}
          setSteps={setSteps}
          setSecondForm={setSecondForm}
          addressList={addressList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Mixins.bgWhite,
  },
  formContainer: {
    ...Mixins.container,
    backgroundColor: Mixins.bgWhite,
    flexDirection: 'column',
  },
});

export default Donate;

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
// screen
import FirstDonateForm from './firstForm';
import SecondDonateForm from './secondForm';
import ThirdDonateForm from './thirdForm';
import ForthDonateForm from './forthForm';
// helper
import {post, get} from '../../helpers/network';
// style
import {Mixins} from '../../assets/mixins';

const Donation = ({navigation}) => {
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
  const [thirdForm, setThirdForm] = useState([
    {
      product_name: '',
      quantity: '',
      weight: '',
    },
  ]);

  const getAddress = async () => {
    const result = await get('address');
    if (result.success) {
      setAddressList(result.data);
      setSecondForm(prevState => ({
        ...prevState,
        addressId: result.data[0]._id,
      }));
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
      {steps === 3 && (
        <ThirdDonateForm
          navigation={navigation}
          steps={steps}
          setSteps={setSteps}
          thirdForm={thirdForm}
          setThirdForm={setThirdForm}
        />
      )}
      {steps === 4 && (
        <ForthDonateForm
          navigation={navigation}
          steps={steps}
          setSteps={setSteps}
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

export default Donation;

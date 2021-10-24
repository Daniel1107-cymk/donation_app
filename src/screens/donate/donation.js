import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FormData from 'form-data';
import Toast from 'react-native-toast-message';
// screen
import FirstDonateForm from './firstForm';
import SecondDonateForm from './secondForm';
import ThirdDonateForm from './thirdForm';
import ForthDonateForm from './forthForm';
// helper
import {postForm, get} from '../../helpers/network';
// style
import {Mixins} from '../../assets/mixins';
// actions
import {resetDonationPhoto} from '../../actions/donationPhotos';

const Donation = ({route, navigation}) => {
  const dispatch = useDispatch();
  const date = new Date();
  const [steps, setSteps] = useState(1);
  const [addressList, setAddressList] = useState(null);
  const [firstForm, setFirstForm] = useState({
    recipientName: '',
    phoneNumber: '',
    date: date.setDate(date.getDate() + 3),
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
  const donationPhotos = useSelector(
    state => state.donationPhotosReducer.donationPhotos,
  );

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
        await forceLogout({navigation: navigation});
      }
    }
  };

  const submitDonation = async () => {
    const form = new FormData();
    form.append('recipient_name', firstForm.recipientName);
    form.append('phone_number', firstForm.phoneNumber);
    form.append('category', firstForm.category);
    form.append('pickup_date', firstForm.date);
    form.append('community', route.params?.communityId);
    form.append('address', secondForm.addressId);
    form.append('donation_details', JSON.stringify(thirdForm));
    donationPhotos.map(uri => {
      form.append('images', {uri: uri, name: 'donation', type: 'image/jpeg'});
    });
    const result = await postForm('donation', form);
    if (result.success) {
      dispatch(resetDonationPhoto());
      navigation.popToTop();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Donation successfully submitted, Thank You',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
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
          submitDonation={submitDonation}
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

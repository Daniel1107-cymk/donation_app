import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import FormData from 'form-data';
// component
import EditProfile from '../../components/profile/editProfile';
import OptionButton from '../../components/profile/optionButton';
import Skeleton from '../../components/profile/skeleton';
// helper
import {get, post, putForm} from '../../helpers/network';
import Session from '../../helpers/tokenHandler';
import {forceLogout} from '../../helpers/logout';
// style
import {Mixins} from '../../assets/mixins';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [flag, setFlag] = useState({
    isEditProfile: false,
    isLoading: true,
    isSubmitting: false,
  });

  const getProfile = async () => {
    const result = await get('profile');
    if (result.success) {
      setUserData(result.data);
      setFlag(prevFlag => ({
        ...prevFlag,
        isLoading: false,
      }));
    } else {
      if (result.status === 401 && result.redirect === true) {
        await forceLogout({navigation: navigation});
      }
    }
  };

  const navigateToAddressList = () => {
    navigation.navigate('AddressList');
  };

  const navigateToDonationHistory = () => {
    navigation.navigate('DonationHistory');
  };

  const updateProfile = async data => {
    setErrors(null);
    setFlag(prevFlag => ({
      ...prevFlag,
      isSubmitting: true,
    }));
    const form = new FormData();
    form.append('first_name', data.firstName);
    form.append('last_name', data.lastName);
    form.append('phone_number', data.phoneNumber);
    if (data.photoUri !== null && data.photoType !== null) {
      form.append('picture', {
        uri: data.photoUri,
        name: 'image',
        type: data.photoType,
      });
    }
    const result = await putForm('update-profile', form);
    if (result.success) {
      getProfile();
      handleShowEditProfileModal();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Profile successfully updated',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
    } else {
      setErrors(result.data);
    }
    setFlag(prevFlag => ({
      ...prevFlag,
      isSubmitting: false,
    }));
  };

  const handleShowEditProfileModal = () => {
    setFlag(prevFlag => ({
      ...prevFlag,
      isEditProfile: !flag.isEditProfile,
    }));
  };

  const logout = async () => {
    const result = await post('logout');
    if (result.success) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Logout successful',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      await Session.removeToken('token');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }
  };

  useEffect(() => {
    navigation.addListener('focus', async () => {
      await getProfile();
    });
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <Avatar
              rounded
              size={100}
              source={{
                uri:
                  userData.picture !== undefined && userData.picture !== null
                    ? `data:${userData.mimetype};base64,${userData.picture}`
                    : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              activeOpacity={0.7}
              containerStyle={{marginBottom: 20}}
            />
            <View style={{marginLeft: '5%', flex: 1}}>
              <Text
                style={
                  Mixins.title
                }>{`${userData.first_name} ${userData.last_name}`}</Text>
              <Text>{userData.email}</Text>
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={handleShowEditProfileModal}>
                <Text style={{color: Mixins.textBlue}}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.counterContainer}>
              <Text style={Mixins.textBoldWhite}>
                Total donation you've been made
              </Text>
              <Text style={styles.counterText}>
                {userData.donations.length}
              </Text>
              <Text style={Mixins.textBoldWhite}>
                {userData.donations.length > 0
                  ? 'Thank you very much'
                  : 'Any donation will be appreciated'}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[Mixins.title, {marginHorizontal: 20}]}>Options</Text>
            <OptionButton
              icon="list-alt"
              title="Manage Address"
              navigate={navigateToAddressList}
            />
            <OptionButton
              icon="history"
              title="Donation History"
              navigate={navigateToDonationHistory}
            />
            <OptionButton
              icon="sign-out-alt"
              title="Logout"
              navigate={logout}
            />
          </View>
          <Text
            style={{
              color: Mixins.textSecondary,
              textAlign: 'right',
              marginRight: 20,
            }}>
            Version {DeviceInfo.getVersion()}
          </Text>
        </ScrollView>
      )}
      {flag.isEditProfile && (
        <EditProfile
          userData={userData}
          isEditProfile={flag.isEditProfile}
          updateProfile={updateProfile}
          handleShowEditProfileModal={handleShowEditProfileModal}
          isSubmitting={flag.isSubmitting}
          errors={errors}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  profileContainer: {
    padding: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    ...Mixins.defaultShadow,
  },
  counterContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Mixins.bgPrimary,
    borderRadius: 5,
  },
  counterText: {
    fontSize: 24,
    color: Mixins.textWhite,
  },
  editProfileButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Mixins.textBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default Profile;

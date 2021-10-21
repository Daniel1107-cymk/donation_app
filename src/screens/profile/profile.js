import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
// component
import OptionButton from '../../components/profile/optionButton';
import Skeleton from '../../components/profile/skeleton';
// helper
import {get, post} from '../../helpers/network';
import Session from '../../helpers/tokenHandler';
import {forceLogout} from '../../helpers/logout';
// style
import {Mixins} from '../../assets/mixins';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
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

  useEffect(async () => {
    await getProfile();
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                backgroundColor: '#ABABAB',
              }}
            />
            <View style={{marginLeft: '5%'}}>
              <Text
                style={
                  Mixins.title
                }>{`${userData.first_name} ${userData.last_name}`}</Text>
              <Text>{userData.email}</Text>
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
});

export default Profile;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screen
import Profile from './profile';
import AddressList from './manage-address/addressList';
import AddressForm from './manage-address/addressForm';
import DonationHistory from './donation-history/historyList';
// style
import {Mixins} from '../../assets/mixins';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Mixins.textWhite,
        headerStyle: {backgroundColor: Mixins.bgHeader},
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="AddressList"
        component={AddressList}
        options={{title: 'Manage Address'}}
      />
      <Stack.Screen
        name="AddressForm"
        component={AddressForm}
        options={{title: 'Manage Address'}}
      />
      <Stack.Screen
        name="DonationHistory"
        component={DonationHistory}
        options={{title: 'Donation History'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

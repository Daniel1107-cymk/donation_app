import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screen
import Donation from './donation';
import CommunityList from './communityList';
import CommunityDetails from './communityDetails';
import Camera from '../../components/camera';
// style
import {Mixins} from '../../assets/mixins';

const Stack = createNativeStackNavigator();

const DonationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CommunityList"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Mixins.textWhite,
      }}>
      <Stack.Screen
        name="CommunityList"
        component={CommunityList}
        options={{
          title: 'Donation',
          headerStyle: {backgroundColor: Mixins.bgHeader},
        }}
      />
      <Stack.Screen
        name="Donation"
        component={Donation}
        options={{
          title: 'Donation',
          headerStyle: {backgroundColor: Mixins.bgHeader},
        }}
      />
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetails}
        options={{
          title: 'Community',
          headerStyle: {backgroundColor: Mixins.bgHeader},
        }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          title: '',
          headerTransparent: true,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DonationNavigator;

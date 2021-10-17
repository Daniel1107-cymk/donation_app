import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screen
import Donation from './donation';
import CommunityList from './communityList';
import CommunityDetails from './communityDetails';
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
        headerStyle: {backgroundColor: Mixins.bgHeader},
      }}>
      <Stack.Screen
        name="CommunityList"
        component={CommunityList}
        options={{
          title: 'Donate',
        }}
      />
      <Stack.Screen name="Donation" component={Donation} />
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetails}
        options={{
          title: 'Community',
        }}
      />
    </Stack.Navigator>
  );
};

export default DonationNavigator;

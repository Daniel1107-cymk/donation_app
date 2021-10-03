import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screen
import Home from './home';
import Community from './community';
// style
import {Mixins} from '../../assets/mixins';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Mixins.textWhite,
        headerStyle: {backgroundColor: Mixins.bgHeader},
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Community" component={Community} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

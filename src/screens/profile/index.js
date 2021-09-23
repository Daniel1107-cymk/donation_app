import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderBackground} from '@react-navigation/elements';
// screen
import Profile from './profile';
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
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

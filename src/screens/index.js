import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HeaderBackground} from '@react-navigation/elements';
import {Icon} from 'react-native-elements';
// screen
import Home from './home';
import Donate from './donate';
import Profile from './profile';
// style
import {Mixins} from '../assets/mixins';

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Mixins.textWhite,
        headerBackground: () => {
          return (
            <HeaderBackground style={{backgroundColor: Mixins.bgHeader}} />
          );
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeMenu"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, style}) => (
            <Icon name="home" type="feather" color="#517fa4" />
          ),
        }}
      />
      <Tab.Screen name="DonateMenu" component={Donate} />
      <Tab.Screen name="ProfileMenu" component={Profile} />
    </Tab.Navigator>
  );
};

export default Index;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HeaderBackground} from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name="HomeMenu"
        component={Home}
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({focused, color, style}) => (
            <View
              style={
                focused
                  ? [styles.iconContainer, {backgroundColor: '#035397'}]
                  : [styles.iconContainer]
              }>
              <Icon
                name="home"
                size={20}
                color={focused ? '#FFF' : '#000000'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="DonateMenu"
        component={Donate}
        options={{
          tabBarIcon: ({focused, color, style}) => (
            <View
              style={
                focused
                  ? [styles.iconContainer, {backgroundColor: '#035397'}]
                  : [styles.iconContainer]
              }>
              <Icon
                name="hand-holding-heart"
                size={20}
                color={focused ? '#FFF' : '#000000'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileMenu"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, style}) => (
            <View
              style={
                focused
                  ? [styles.iconContainer, {backgroundColor: '#035397'}]
                  : [styles.iconContainer]
              }>
              <Icon
                name="user"
                size={20}
                color={focused ? '#FFF' : '#000000'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Index;

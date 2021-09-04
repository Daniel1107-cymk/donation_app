import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screen
import Login from './src/screens/login';
import Register from './src/screens/register';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{animation: 'none'}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={() => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

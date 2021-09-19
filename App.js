import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
// screen
import Login from './src/screens/login';
import Register from './src/screens/register';
import Home from './src/screens/home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
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
          <Stack.Screen
            name="Home"
            component={Home}
            options={() => ({
              headerShown: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default App;

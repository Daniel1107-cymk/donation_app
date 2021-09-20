import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
// helper
import Session from './src/helpers/session';
// screen
import Login from './src/screens/login';
import Register from './src/screens/register';
import Menu from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loaded, setIsloaded] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState('');

  const checkLogin = async () => {
    let token;
    token = await Session.getValue('token');
    if (token === null) {
      setDefaultRoute('Login');
    } else {
      setDefaultRoute('Menu');
    }
  };

  useEffect(async () => {
    await checkLogin();
    setIsloaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={defaultRoute}
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
                name="Menu"
                component={Menu}
                options={() => ({
                  headerShown: false,
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast ref={ref => Toast.setRef(ref)} />
        </>
      )}
    </>
  );
};

export default App;

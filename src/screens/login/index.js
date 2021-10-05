import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
// helper
import {post} from '../../helpers/network';
import Session from '../../helpers/session';
// style
import {Mixins} from '../../assets/mixins';

const screen = Dimensions.get('window');

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [flag, setFlag] = useState({
    isShowPassword: true,
    isSubmitting: false,
  });

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Menu'}],
      }),
    );
  };

  const toggleShowPassword = () => {
    setFlag(prevFlag => ({
      ...prevFlag,
      isShowPassword: !flag.isShowPassword,
    }));
  };

  const toggleIsSubmitting = bool => {
    setFlag(prevFlag => ({
      ...prevFlag,
      isSubmitting: bool,
    }));
  };

  const checkError = inputName => {
    let message = '';
    if (errors !== null && Array.isArray(errors)) {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].param === inputName) {
          message = errors[i].msg;
        }
      }
    }
    return message;
  };

  const requestLocationPermission = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(async statuses => {
      if (
        statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'blocked' ||
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'blocked'
      ) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2:
            'This app require location access. Please allow location permission!',
          autoHide: false,
          bottomOffset: 20,
        });
        setTimeout(() => {
          openSettings();
        }, 3000);
      } else if (
        statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'denied' ||
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'denied'
      ) {
        requestLocationPermission();
      }
    });
  };

  const checkPermission = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ])
      .then(result => {
        switch (result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            requestLocationPermission();
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.BLOCKED:
            requestLocationPermission();
            break;
        }
        switch (result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            requestLocationPermission();
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.BLOCKED:
            requestLocationPermission();
            break;
        }
      })
      .catch(error => {});
  };

  const Login = async () => {
    checkPermission();
    setErrors(null);
    toggleIsSubmitting(true);
    const data = {
      email: email,
      password: password,
    };
    const result = await post('login', JSON.stringify(data));
    if (result.success) {
      await Session.setValue('token', result.data.token);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Login successful',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      goToHome();
    } else {
      setErrors(result.data);
    }
    toggleIsSubmitting(false);
  };

  useEffect(() => {
    checkPermission();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={{color: Mixins.textWhite}}>Logo</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{flex: 0.4}}>
          <Input
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            containerStyle={{paddingHorizontal: 0}}
            inputContainerStyle={{...Mixins.inputTextContainer}}
            textAlign="center"
            labelStyle={{...Mixins.label}}
            errorMessage={checkError('email')}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            containerStyle={{paddingHorizontal: 0}}
            inputContainerStyle={{...Mixins.inputTextContainer}}
            textAlign="center"
            secureTextEntry={flag.isShowPassword}
            labelStyle={{...Mixins.label}}
            errorMessage={checkError('password')}
            rightIcon={
              <TouchableWithoutFeedback onPress={toggleShowPassword}>
                <Text
                  style={
                    flag.isShowPassword
                      ? {textDecorationLine: 'none'}
                      : {textDecorationLine: 'line-through'}
                  }>
                  Show
                </Text>
              </TouchableWithoutFeedback>
            }
            rightIconContainerStyle={{position: 'absolute', right: 10}}
          />
          <Button
            title={flag.isSubmitting ? 'Submitting' : 'Login'}
            onPress={Login}
            buttonStyle={styles.button}
            containerStyle={{marginTop: 20}}
            disabledTitleStyle={{color: Mixins.textWhite}}
            disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
            disabled={email === '' || password === '' || flag.isSubmitting}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.flexRow}>
            <Text style={{color: Mixins.textWhite}}>
              Don't have an account ?{' '}
            </Text>
            <TouchableWithoutFeedback onPress={goToRegister}>
              <Text style={{color: Mixins.textOrange}}>Register</Text>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{color: Mixins.textWhite, textAlign: 'center'}}>Or</Text>
          <Button
            title="Login with Google"
            titleStyle={{color: Mixins.textPrimary}}
            buttonStyle={{backgroundColor: '#FFF'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    backgroundColor: Mixins.bgPrimary,
    flexDirection: 'column',
  },
  logoContainer: {
    flexGrow: 0.2,
    backgroundColor: 'green',
    width: screen.width * 0.8,
    marginHorizontal: 20,
  },
  formContainer: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  sectionContainer: {
    flex: 0.2,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: Mixins.bgButtonPrimary,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default Login;

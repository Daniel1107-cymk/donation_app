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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// helper
import {post} from '../../helpers/network';
import Session from '../../helpers/session';
// style
import {Mixins} from '../../assets/mixins';

GoogleSignin.configure({
  scopes: ['profile', 'email', 'openid'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '750813962438-6egdao8rv7d1nlpjh59m8c6ovcn6f8ar.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

const screen = Dimensions.get('window');

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [googleData, setGoogleData] = useState(null);
  const [flag, setFlag] = useState({
    isShowBindAccount: false,
    isShowPassword: true,
    isSubmitting: false,
    isSigninInProgress: false,
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

  const googleSignIn = async () => {
    setFlag(prevFlag => ({
      ...prevFlag,
      isSigninInProgress: true,
    }));
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        const data = {
          email: userInfo.user.email,
          google_id: userInfo.idToken,
          first_name: userInfo.user.givenName,
          last_name: userInfo.user.familyName,
        };
        const result = await post('google-signin', JSON.stringify(data));
        if (result.success) {
          if (result.data.token !== undefined) {
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
          } else if (result.data.msg === 'Email exists') {
            setGoogleData(data);
            setFlag(prevFlag => ({
              ...prevFlag,
              isShowBindAccount: true,
            }));
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error',
              text2: 'Google sign-in fail, please try again!',
              visibilityTime: 1000,
              autoHide: true,
              bottomOffset: 20,
            });
          }
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('no play services');
      } else {
        console.log('error');
      }
    }
    setFlag(prevFlag => ({
      ...prevFlag,
      isSigninInProgress: false,
    }));
  };

  const bindingAction = async action => {
    if (action) {
      const data = {
        email: googleData.email,
        google_id: googleData.google_id,
      };
      const result = await post('binding-account', JSON.stringify(data));
      if (result.success) {
        await Session.setValue('token', result.data.token);
        setGoogleData(null);
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
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Binding account fail, please try again!',
          visibilityTime: 1000,
          autoHide: true,
          bottomOffset: 20,
        });
      }
    }
    setFlag(prevFlag => ({
      ...prevFlag,
      isShowBindAccount: false,
    }));
    setGoogleData(null);
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
          <GoogleSigninButton
            style={{width: '100%', height: 50}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={googleSignIn}
            disabled={flag.isSigninInProgress}
          />
        </View>
      </View>
      {flag.isShowBindAccount && googleData !== null && (
        <View
          style={{
            ...styles.bindModal,
            opacity: 1,
            backgroundColor: 'transparent',
          }}>
          <View style={styles.bindModal} />
          <View style={styles.modalContainer}>
            <Text style={styles.text}>Are you sure you want to bind</Text>
            <Text
              style={[
                styles.text,
                {fontWeight: 'bold'},
              ]}>{`${googleData.email}`}</Text>
            <Text style={styles.text}>account ?</Text>
            <View style={{...styles.flexRow, justifyContent: 'space-evenly'}}>
              <Button
                title="No"
                onPress={() => bindingAction()}
                buttonStyle={{
                  ...styles.button,
                  backgroundColor: Mixins.bgButtonSecondary,
                  width: 100,
                }}
                containerStyle={{marginTop: 20}}
              />
              <Button
                title="Yes"
                onPress={() => bindingAction(true)}
                buttonStyle={{...styles.button, width: 100}}
                containerStyle={{marginTop: 20}}
              />
            </View>
          </View>
        </View>
      )}
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
    borderRadius: 100,
    height: 50,
  },
  flexRow: {
    flexDirection: 'row',
  },
  bindModal: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    elevation: 5,
  },
  modalContainer: {
    backgroundColor: Mixins.bgWhite,
    width: screen.width * 0.9,
    borderRadius: 10,
    padding: 20,
    zIndex: 10,
    elevation: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Login;

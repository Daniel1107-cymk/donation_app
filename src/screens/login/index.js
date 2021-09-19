import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
// helper
import {post} from '../../helpers/network';
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
        routes: [{name: 'Home'}],
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

  const Login = async () => {
    setErrors(null);
    toggleIsSubmitting(true);
    const data = {
      email: email,
      password: password,
    };
    const result = await post('login', JSON.stringify(data));
    if (result.success) {
      goToHome();
    } else {
      setErrors(result.data);
    }
    toggleIsSubmitting(false);
  };

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

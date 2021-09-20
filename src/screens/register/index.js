import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// screen
import FirstStep from '../../components/register/firstStep';
import SecondStep from '../../components/register/secondStep';
import ThirdStep from '../../components/register/thirdStep';
// helper
import {post} from '../../helpers/network';
import Session from '../../helpers/session';
// style
import {Mixins} from '../../assets/mixins';

const Register = ({navigation}) => {
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState(null);
  const [firstForm, setFirstForm] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });
  const [secondForm, setSecondForm] = useState({
    first_name: '',
    last_name: '',
  });
  const [thirdForm, setThirdForm] = useState({
    phone_number: '',
  });

  const submitRegister = async () => {
    let data = {
      ...firstForm,
      ...secondForm,
      ...thirdForm,
    };
    let body = JSON.stringify(data);
    const result = await post('register', body);
    if (result.success) {
      await Session.setValue('token', result.data.token);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success',
        text2: 'Register successful',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Menu'}],
        }),
      );
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error',
        text2: 'Something wrong, please try again',
        visibilityTime: 3,
        autoHide: true,
      });
    }
  };

  const validatePasswordConfirmation = async () => {
    if (firstForm.password !== firstForm.confirm_password) {
      let msg = [
        {
          msg: 'Password not match',
          param: 'password',
        },
      ];
      setErrors(msg);
    } else {
      setSteps(steps + 1);
    }
  };

  const validateEmail = async () => {
    setErrors(null);
    const data = firstForm;
    const body = JSON.stringify(data);
    const result = await post('validate-email', body);
    if (result.success) {
      validatePasswordConfirmation();
    } else {
      setErrors(result.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {steps === 1 && (
        <FirstStep
          firstForm={firstForm}
          setFirstForm={setFirstForm}
          steps={steps}
          setSteps={setSteps}
          errors={errors}
          validateEmail={validateEmail}
          navigation={navigation}
        />
      )}
      {steps === 2 && (
        <SecondStep
          secondForm={secondForm}
          setSecondForm={setSecondForm}
          steps={steps}
          setSteps={setSteps}
          navigation={navigation}
        />
      )}
      {steps === 3 && (
        <ThirdStep
          thirdForm={thirdForm}
          setThirdForm={setThirdForm}
          steps={steps}
          setSteps={setSteps}
          navigation={navigation}
          submitRegister={submitRegister}
        />
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
});

export default Register;

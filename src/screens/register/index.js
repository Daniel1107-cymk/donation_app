import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
// screen
import FirstStep from '../../components/register/firstStep';
import SecondStep from '../../components/register/secondStep';
import ThirdStep from '../../components/register/thirdStep';
// helper
import {post} from '../../helpers/network';
// style
import {Mixins} from '../../assets/mixins';

const Register = ({navigation}) => {
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState(null);
  const [firstForm, setFirstForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [secondForm, setSecondForm] = useState({
    firstName: '',
    lastName: '',
  });
  const [thirdForm, setThirdForm] = useState({
    phoneNumber: '',
    fullAddress: '',
  });

  const submitRegister = () => {
    let body = {
      ...firstForm,
      ...secondForm,
      ...thirdForm,
    };
    // using axios for post
    // if success save return token to storage
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
    // if fail
  };

  const validatePasswordConfirmation = async () => {
    if (firstForm.password !== firstForm.confirmPassword) {
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
    console.log(result);
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

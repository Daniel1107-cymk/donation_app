import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// screen
import FirstStep from '../../components/register/firstStep';
import SecondStep from '../../components/register/secondStep';
import ThirdStep from '../../components/register/thirdStep';
// style
import {Mixins} from '../../assets/mixins';

const Register = ({navigation}) => {
  const [steps, setSteps] = useState(1);
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
    navigation.navigate('Home');
    // if fail
  };

  return (
    <SafeAreaView style={styles.container}>
      {steps === 1 && (
        <FirstStep
          firstForm={firstForm}
          setFirstForm={setFirstForm}
          steps={steps}
          setSteps={setSteps}
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

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
// style
import {Mixins} from '../../assets/mixins';

const screen = Dimensions.get('window');

const FirstStep = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const goToLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.stepsContainer}>
          <View style={styles.activeSteps}>
            <Text style={styles.stepsText}>1</Text>
          </View>
          <View style={styles.inActiveSteps}>
            <Text style={styles.stepsText}>2</Text>
          </View>
          <View style={styles.inActiveSteps}>
            <Text style={styles.stepsText}>3</Text>
          </View>
          <View style={styles.line} />
        </View>
        <Text style={styles.headerTitle}>First step</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{flex: 0.5}}>
          <Input
            label="Email"
            value={props.firstForm.email}
            onChangeText={text =>
              props.setFirstForm(prevState => ({
                ...prevState,
                email: text,
              }))
            }
            containerStyle={{paddingHorizontal: 0}}
            inputContainerStyle={{...Mixins.inputTextContainer}}
            labelStyle={{...Mixins.label}}
          />
          <Input
            label="Password"
            secureTextEntry={!showPassword}
            value={props.firstForm.password}
            onChangeText={text =>
              props.setFirstForm(prevState => ({
                ...prevState,
                password: text,
              }))
            }
            rightIcon={
              <TouchableWithoutFeedback
                onPress={() => setShowPassword(!showPassword)}>
                <Text
                  style={
                    showPassword
                      ? {textDecorationLine: 'line-through'}
                      : {textDecorationLine: 'none'}
                  }>
                  Show
                </Text>
              </TouchableWithoutFeedback>
            }
            containerStyle={{paddingHorizontal: 0}}
            inputContainerStyle={{...Mixins.inputTextContainer}}
            labelStyle={{...Mixins.label}}
          />
          <Input
            label="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={props.firstForm.confirmPassword}
            onChangeText={text =>
              props.setFirstForm(prevState => ({
                ...prevState,
                confirmPassword: text,
              }))
            }
            rightIcon={
              <TouchableWithoutFeedback
                onPress={() => setShowConfirmPassword(!showPassword)}>
                <Text
                  style={
                    showConfirmPassword
                      ? {textDecorationLine: 'line-through'}
                      : {textDecorationLine: 'none'}
                  }>
                  Show
                </Text>
              </TouchableWithoutFeedback>
            }
            containerStyle={{paddingHorizontal: 0}}
            inputContainerStyle={{...Mixins.inputTextContainer}}
            labelStyle={{...Mixins.label}}
          />
          <Button
            title="Next"
            buttonStyle={{backgroundColor: Mixins.bgButtonPrimary}}
            containerStyle={{marginTop: 20}}
            onPress={() => props.setSteps(props.steps + 1)}
            disabledTitleStyle={{color: Mixins.textWhite}}
            disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
            disabled={
              props.firstForm.email === '' ||
              props.firstForm.password === '' ||
              props.firstForm.confirmPassword === ''
            }
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.flexRow}>
            <Text style={{color: Mixins.textWhite}}>
              Already have an account ?{' '}
            </Text>
            <TouchableWithoutFeedback onPress={goToLogin}>
              <Text style={{color: Mixins.textOrange}}>Login</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    backgroundColor: Mixins.bgPrimary,
    flexDirection: 'column',
  },
  header: {
    flexGrow: 0.1,
    width: screen.width * 0.8,
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
  },
  headerTitle: {
    color: Mixins.textWhite,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inActiveSteps: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Mixins.bgButtonSecondary,
  },
  activeSteps: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Mixins.bgButtonPrimary,
  },
  stepsText: {
    color: Mixins.textWhite,
  },
  line: {
    position: 'absolute',
    width: '100%',
    borderWidth: 0.55,
    borderColor: '#FFF',
    zIndex: -1,
  },
  formContainer: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  sectionContainer: {
    flex: 0.1,
    justifyContent: 'space-around',
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default FirstStep;

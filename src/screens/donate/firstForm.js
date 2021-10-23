import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
// style
import {Mixins} from '../../assets/mixins';

const FirstDonateForm = props => {
  return (
    <>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Recipient Details</Text>
        <Input
          label="Recipient Name*"
          value={props.firstForm.recipientName}
          onChangeText={text =>
            props.setFirstForm(prevState => ({
              ...prevState,
              recipientName: text,
            }))
          }
          containerStyle={{paddingHorizontal: 0}}
          inputContainerStyle={{...Mixins.inputTextContainer}}
          labelStyle={styles.label}
        />
        <Input
          label="Phone Number*"
          value={props.firstForm.phoneNumber}
          onChangeText={text =>
            props.setFirstForm(prevState => ({
              ...prevState,
              phoneNumber: text,
            }))
          }
          containerStyle={{paddingHorizontal: 0}}
          inputContainerStyle={{...Mixins.inputTextContainer}}
          labelStyle={styles.label}
          keyboardType="phone-pad"
        />
        <Text style={styles.title}>Donation Details</Text>
        <Text style={styles.label}>Category*</Text>
        <View style={{...Mixins.inputTextContainer, height: 55}}>
          <Picker
            selectedValue={props.firstForm.category}
            onValueChange={(itemValue, itemIndex) =>
              props.setFirstForm(prevState => ({
                ...prevState,
                category: itemValue,
              }))
            }>
            <Picker.Item label="Select a category" value="" />
            <Picker.Item label="Goods" value="goods" />
            <Picker.Item label="Food" value="food" />
          </Picker>
        </View>
      </View>
      <Button
        title="Next"
        buttonStyle={styles.button}
        containerStyle={{marginTop: 20}}
        onPress={() => props.setSteps(props.steps + 1)}
        disabledTitleStyle={{color: Mixins.textWhite}}
        disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
        disabled={
          props.firstForm.recipientName === '' ||
          props.firstForm.phoneNumber === '' ||
          props.firstForm.category === '' ||
          props.addressList === null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    ...Mixins.label,
    color: Mixins.textPrimary,
    textAlign: 'left',
  },
  title: {
    ...Mixins.titleBold,
    color: Mixins.textPrimary,
    textAlign: 'left',
  },
  button: {
    backgroundColor: Mixins.bgButtonPrimary,
    height: 50,
    borderRadius: 100,
  },
});

export default FirstDonateForm;

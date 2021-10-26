import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// helper
import Format from '../../helpers/format';
// style
import {Mixins} from '../../assets/mixins';

const FirstDonateForm = props => {
  const date = new Date();
  const [show, setShow] = useState(false);
  const [minDate, setMinDate] = useState(date.setDate(date.getDate() + 3));

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
        <Text style={styles.label}>Pick Up Date*</Text>
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={() => setShow(true)}>
          <Text style={Mixins.textSecondary}>
            {Format.formatDate(props.firstForm.date)}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={new Date(props.firstForm.date)}
            mode="date"
            display="calendar"
            minimumDate={minDate}
            onChange={(event, selectedDate) => {
              setShow(false);
              props.setFirstForm(prevState => ({
                ...prevState,
                date: selectedDate || props.firstForm.date,
              }));
            }}
          />
        )}
        <Text style={styles.label}>Category*</Text>
        <View style={{...Mixins.inputTextContainer, height: 55}}>
          <Picker
            mode="dropdown"
            selectedValue={props.firstForm.category}
            onValueChange={(itemValue, itemIndex) =>
              props.setFirstForm(prevState => ({
                ...prevState,
                category: itemValue,
              }))
            }>
            <Picker.Item label="Select a category" value="" />
            {props.categoryList !== null &&
              props.categoryList.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.name}
                  value={item._id}
                />
              ))}
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
  datePickerContainer: {
    ...Mixins.inputTextContainer,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    marginBottom: 20,
  },
});

export default FirstDonateForm;

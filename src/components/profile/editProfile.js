import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Input, Overlay, Avatar} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
// style
import {Mixins} from '../../assets/mixins';

const window = Dimensions.get('window');

const EditProfile = ({
  userData,
  handleShowEditProfileModal,
  updateProfile,
  isSubmitting,
  errors,
}) => {
  const [userDataForm, setUserDataForm] = useState({
    firstName: userData.first_name,
    lastName: userData.last_name,
    phoneNumber: userData.phone_number ?? '',
    photoUri: null,
    photoType: null,
  });

  const handleImagePicker = data => {
    if (!data.didCancel) {
      setUserDataForm(prevUserData => ({
        ...prevUserData,
        photoUri: data.assets[0].uri,
        photoType: data.assets[0].type,
      }));
    }
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

  return (
    <Overlay
      onBackdropPress={handleShowEditProfileModal}
      overlayStyle={styles.editProfileContainer}>
      <Avatar
        rounded
        size={125}
        icon={{name: 'camera', type: 'font-awesome', size: 30}}
        source={{
          uri:
            userDataForm.photoUri === null
              ? 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
              : userDataForm.photoUri,
        }}
        activeOpacity={0.7}
        containerStyle={{marginBottom: 20}}
        onPress={() => {
          launchImageLibrary(
            {
              maxWidth: 500,
              maxHeight: 500,
              quality: 0.5,
              mediaType: 'photo',
            },
            handleImagePicker,
          );
        }}
      />
      <Input
        label="First Name"
        value={userDataForm.firstName}
        onChangeText={text =>
          setUserDataForm(prevUserData => ({
            ...prevUserData,
            firstName: text,
          }))
        }
        containerStyle={{paddingHorizontal: 0}}
        inputContainerStyle={{...Mixins.inputTextContainer}}
        textAlign="center"
        labelStyle={{...Mixins.label, color: Mixins.textPrimary}}
        errorMessage={checkError('first_name')}
      />
      <Input
        label="Last Name"
        value={userDataForm.lastName}
        onChangeText={text =>
          setUserDataForm(prevUserData => ({
            ...prevUserData,
            lastName: text,
          }))
        }
        containerStyle={{paddingHorizontal: 0}}
        inputContainerStyle={{...Mixins.inputTextContainer}}
        textAlign="center"
        labelStyle={{...Mixins.label, color: Mixins.textPrimary}}
        errorMessage={checkError('last_name')}
      />
      <Input
        label="Phone Number"
        value={userDataForm.phoneNumber}
        onChangeText={text =>
          setUserDataForm(prevUserData => ({
            ...prevUserData,
            phoneNumber: text,
          }))
        }
        containerStyle={{paddingHorizontal: 0}}
        inputContainerStyle={{...Mixins.inputTextContainer}}
        textAlign="center"
        keyboardType="phone-pad"
        labelStyle={{...Mixins.label, color: Mixins.textPrimary}}
        errorMessage={checkError('phone_number')}
      />
      <Button
        title={isSubmitting ? 'Submitting' : 'Login'}
        onPress={() => updateProfile(userDataForm)}
        buttonStyle={styles.button}
        containerStyle={{marginTop: 20, width: '100%'}}
        disabledTitleStyle={{color: Mixins.textWhite}}
        disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
        disabled={isSubmitting}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  editProfileContainer: {
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: Mixins.bgWhite,
    borderRadius: 10,
    width: window.width * 0.9,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: Mixins.bgButtonPrimary,
    borderRadius: 100,
    height: 50,
  },
});

export default EditProfile;

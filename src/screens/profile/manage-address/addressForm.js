import React, {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
// component
import Skeleton from '../../../components/profile/manage-address/addressFormSkeleton';
// helper
import {post} from '../../../helpers/network';
import {forceLogout} from '../../../helpers/logout';
// style
import {Mixins} from '../../../assets/mixins';

const window = Dimensions.get('window');

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = (window.width / window.height) * LATITUDE_DELTA;

const AddressForm = props => {
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [errors, setErrors] = useState(null);
  const [mapData, setMapData] = useState({
    region: null,
  });
  const [flag, setFlag] = useState({
    isLoading: true,
    isSubmitting: false,
  });

  const onRegionChange = region => {
    setMapData({
      region: region,
    });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setMapData(prevMapData => ({
          ...prevMapData,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        }));
        setFlag(prevFlag => ({
          ...prevFlag,
          isLoading: false,
        }));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
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

  const toggleIsSubmitting = bool => {
    setFlag(prevFlag => ({
      ...prevFlag,
      isSubmitting: bool,
    }));
  };

  const submit = async () => {
    toggleIsSubmitting(true);
    setErrors(null);
    const data = {
      address: fullAddress,
      city: city,
      zipcode: zipCode,
      latitude: mapData.region.latitude,
      longitude: mapData.region.longitude,
    };
    const result = await post('address', JSON.stringify(data));
    if (result.success) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Address added successfully',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
      props.navigation.navigate('AddressList');
    } else {
      setErrors(result.data);
    }
    toggleIsSubmitting(false);
  };

  const disableButton = () => {
    if (
      fullAddress === '' ||
      city === '' ||
      zipCode === '' ||
      flag.isSubmitting
    ) {
      return true;
    }
    return false;
  };

  useEffect(async () => {
    getCurrentPosition();
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading || mapData.region === null ? (
        <Skeleton />
      ) : (
        <>
          <View style={styles.map}>
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={mapData.region}
              style={{
                backgroundColor: 'transparent',
                width: window.width,
                height: window.height * 0.45,
              }}
              onRegionChangeComplete={onRegionChange}
              customMapStyle={[
                {
                  featureType: 'poi',
                  stylers: [
                    {
                      visibility: 'off',
                    },
                  ],
                },
                {
                  featureType: 'transit',
                  stylers: [
                    {
                      visibility: 'off',
                    },
                  ],
                },
              ]}
            />
            <Icon
              name="map-marker-alt"
              size={30}
              color={Mixins.textBlue}
              style={{position: 'absolute', bottom: '50.5%'}}
            />
          </View>
          <View style={Mixins.container}>
            <Text style={Mixins.titleBold}>Address Details</Text>
            <Input
              label="Full Address"
              placeholder="Ex: 305 Locust Street"
              value={fullAddress}
              onChangeText={text => setFullAddress(text)}
              containerStyle={{paddingHorizontal: 0}}
              inputContainerStyle={{...Mixins.inputTextContainer}}
              labelStyle={styles.label}
              errorMessage={checkError('address')}
            />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Input
                label="City"
                placeholder="Ex: Valdosta"
                value={city}
                onChangeText={text => setCity(text)}
                containerStyle={{paddingHorizontal: 0, flex: 1, marginRight: 5}}
                inputContainerStyle={{...Mixins.inputTextContainer}}
                labelStyle={styles.label}
                errorMessage={checkError('city')}
              />
              <Input
                label="Zipcode"
                placeholder="Ex: 31601"
                value={zipCode}
                onChangeText={text => setZipcode(text.replace(/[^0-9]/g, ''))}
                containerStyle={{paddingHorizontal: 0, flex: 1, marginLeft: 5}}
                inputContainerStyle={{...Mixins.inputTextContainer}}
                labelStyle={styles.label}
                keyboardType="number-pad"
                errorMessage={checkError('zipcode')}
              />
            </View>
            <Button
              title="Save"
              onPress={submit}
              buttonStyle={styles.button}
              containerStyle={{marginTop: 20}}
              disabledTitleStyle={{color: Mixins.textWhite}}
              disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
              disabled={disableButton()}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  map: {
    backgroundColor: 'transparent',
    width: window.width,
    height: window.height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...Mixins.label,
    color: Mixins.textPrimary,
    textAlign: 'left',
  },

  button: {
    backgroundColor: Mixins.bgButtonPrimary,
  },
});

export default AddressForm;

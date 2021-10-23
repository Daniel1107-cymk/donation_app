import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Toast from 'react-native-toast-message';
// style
import {Mixins} from '../../assets/mixins';

const window = Dimensions.get('window');

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = (window.width / window.height) * LATITUDE_DELTA;

const SecondDonateForm = props => {
  const [mapData, setMapData] = useState({
    region: null,
  });
  const [index, setIndex] = useState(0);

  const getCurrentPosition = () => {
    const {addressList, secondForm} = props;
    let index =
      secondForm.selectedAddressListIndex === null
        ? 0
        : secondForm.selectedAddressListIndex;
    if (props.addressList !== null) {
      setMapData(prevMapData => ({
        ...prevMapData,
        region: {
          latitude: addressList[index].latitude,
          longitude: addressList[index].longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      }));
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Something went wrong, please try again!',
        visibilityTime: 1000,
        autoHide: true,
        bottomOffset: 20,
      });
    }
  };

  const loadLatLongData = () => {
    const {addressList, secondForm} = props;
    let index =
      secondForm.selectedAddressListIndex === null
        ? 0
        : secondForm.selectedAddressListIndex;
    setMapData(prevMapData => ({
      ...prevMapData,
      region: {
        latitude: addressList[index].latitude,
        longitude: addressList[index].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }));
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    loadLatLongData();
  }, [props.secondForm.selectedAddressListIndex]);

  return (
    <>
      {mapData.region !== null && (
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={mapData.region}
            style={{
              backgroundColor: 'transparent',
              width: window.width,
              height: window.height * 0.45,
            }}
            zoomEnabled={false}
            zoomTapEnabled={false}
            scrollEnabled={false}
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
      )}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Please select an address*</Text>
        <View style={{...Mixins.inputTextContainer, height: 55}}>
          <Picker
            selectedValue={
              props.addressList[
                props.secondForm.selectedAddressListIndex === null
                  ? 0
                  : props.secondForm.selectedAddressListIndex
              ]._id
            }
            onValueChange={(itemValue, itemIndex) =>
              props.setSecondForm(prevState => ({
                ...prevState,
                selectedAddressListIndex: itemIndex,
                addressId: itemValue,
              }))
            }>
            {props.addressList.map(data => {
              return (
                <Picker.Item
                  key={data._id}
                  label={data.address}
                  value={data._id}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Button
          title="Next"
          buttonStyle={styles.button}
          containerStyle={{marginTop: 20}}
          onPress={() => props.setSteps(props.steps + 1)}
          disabledTitleStyle={{color: Mixins.textWhite}}
          disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
          disabled={props.secondForm.addressId === null}
        />
        <Button
          title="Back"
          buttonStyle={{
            ...styles.button,
            backgroundColor: Mixins.bgButtonSecondary,
          }}
          containerStyle={{marginTop: 20}}
          onPress={() => props.setSteps(props.steps - 1)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  formContainer: {
    ...Mixins.container,
    backgroundColor: Mixins.bgWhite,
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

export default SecondDonateForm;

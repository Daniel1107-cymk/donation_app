import React, {useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useSelector, useDispatch} from 'react-redux';
import {Mixins} from '../../assets/mixins';
import Icon from 'react-native-vector-icons/dist/Ionicons';
// actions
import {addDonationPhoto} from '../../actions/donationPhotos';

const window = Dimensions.get('window');

const Camera = props => {
  const dispatch = useDispatch();
  const donationPhotos = useSelector(
    state => state.donationPhotosReducer.donationPhotos,
  );
  const cameraEl = useRef(null);
  const [data, setData] = useState(null);

  const takePicture = async () => {
    if (cameraEl) {
      const options = {quality: 0.5};
      const data = await cameraEl.current.takePictureAsync(options);
      setData(data.uri);
    }
  };

  const confirm = action => {
    if (action) {
      let newDonationPhotos = [...donationPhotos];
      newDonationPhotos.push(data);
      dispatch(addDonationPhoto(newDonationPhotos));
      props.navigation.navigate('Donation');
    } else {
      setData(null);
    }
  };

  return (
    <View style={styles.container}>
      {data === null ? (
        <>
          <RNCamera
            ref={cameraEl}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
          />
          <View style={styles.singleButtonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.button} />
          </View>
        </>
      ) : (
        <>
          <Image source={{uri: data}} style={styles.preview} />
          <View style={styles.doubleButtoncontainer}>
            <TouchableOpacity onPress={() => confirm(false)}>
              <Icon
                name="close-circle-outline"
                size={70}
                color={Mixins.bgWhite}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirm(true)}>
              <Icon
                name="checkmark-circle-outline"
                size={70}
                color={Mixins.bgWhite}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  singleButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  doubleButtoncontainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    position: 'absolute',
    left: (window.width - 80) * 0.5,
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: Mixins.bgWhite,
  },
});

export default Camera;

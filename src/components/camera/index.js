import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useSelector, useDispatch} from 'react-redux';
import {Mixins} from '../../assets/mixins';
// actions
import {addDonationPhoto} from '../../actions/donationPhotos';

const window = Dimensions.get('window');

const Camera = props => {
  const dispatch = useDispatch();
  const donationPhotos = useSelector(
    state => state.donationPhotosReducer.donationPhotos,
  );
  const cameraEl = useRef(null);

  const takePicture = async () => {
    if (cameraEl) {
      const options = {quality: 0.5};
      const data = await cameraEl.current.takePictureAsync(options);
      let newDonationPhotos = [...donationPhotos];
      newDonationPhotos.push(data.uri);
      dispatch(addDonationPhoto(newDonationPhotos));
      props.navigation.navigate('Donation');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraEl}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={styles.button} />
      </View>
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

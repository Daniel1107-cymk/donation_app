import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Image, LinearProgress, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';
// style
import {Mixins} from '../../assets/mixins';
// actions
import {addDonationPhoto} from '../../actions/donationPhotos';

const window = Dimensions.get('window');

const ForthDonateForm = props => {
  const dispatch = useDispatch();
  const donationPhotos = useSelector(
    state => state.donationPhotosReducer.donationPhotos,
  );
  const [index, setIndex] = useState(null);
  const [flag, setFlag] = useState({
    isShowOverlay: false,
  });

  const navigateToCamera = () => {
    props.navigation.navigate('Camera');
  };

  const showOverlay = index => {
    setIndex(index);
    setFlag(prevFlag => ({
      ...prevFlag,
      isShowOverlay: !flag.isShowOverlay,
    }));
  };

  const deletePhotos = action => {
    let newDonationPhotos = [...donationPhotos];
    newDonationPhotos.splice(index, 1);
    dispatch(addDonationPhoto(newDonationPhotos));
    showOverlay(null);
  };

  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={Mixins.container}>
          <Text style={styles.title}>Goods Photos</Text>
          <View style={styles.photoContainer}>
            {donationPhotos.length > 0 ? (
              <>
                {donationPhotos.map((uri, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => showOverlay(index)}>
                    <Image
                      key={index}
                      source={{uri: uri}}
                      style={styles.images}
                    />
                  </TouchableOpacity>
                ))}
                <Button
                  type="clear"
                  titleStyle={{color: Mixins.textBlue}}
                  icon={
                    <Icon
                      name="add-circle-outline"
                      size={24}
                      color={Mixins.bgPrimary}
                    />
                  }
                  containerStyle={styles.squareBlueButton}
                  onPress={navigateToCamera}
                />
              </>
            ) : (
              <Button
                type="clear"
                title="Add goods photos"
                titleStyle={{color: Mixins.textBlue}}
                icon={
                  <Icon
                    name="add-circle-outline"
                    size={24}
                    color={Mixins.bgPrimary}
                  />
                }
                iconPosition="top"
                containerStyle={styles.blueButton}
                onPress={navigateToCamera}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <Button
        title="Submit"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        disabled={donationPhotos.length === 0}
        disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
        disabledTitleStyle={{color: Mixins.textWhite}}
        onPress={props.submitDonation}
        disabled={props.isSubmitting}
      />
      <Button
        title="Back"
        buttonStyle={{
          ...styles.button,
          backgroundColor: Mixins.bgButtonSecondary,
        }}
        containerStyle={styles.buttonContainer}
        onPress={() => props.setSteps(props.steps - 1)}
      />
      <Overlay visible={props.isSubmitting}>
        <Text style={{textAlign: 'center', marginBottom: 20}}>
          Upload progress
        </Text>
        <LinearProgress
          style={styles.progressBar}
          color={Mixins.bgHeader}
          variant="determinate"
          value={props.uploadPercentage / 100}
        />
      </Overlay>
      <Overlay
        visible={flag.isShowOverlay}
        onBackdropPress={() => showOverlay(null)}>
        {index !== null && (
          <Image
            source={{uri: donationPhotos[index]}}
            style={styles.previewPhotos}
          />
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={deletePhotos}>
          <Icon name="trash-outline" size={50} color={Mixins.bgWhite} />
        </TouchableOpacity>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    ...Mixins.defaultShadow,
    backgroundColor: Mixins.bgWhite,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    ...Mixins.titleBold,
    color: Mixins.textPrimary,
    textAlign: 'left',
  },
  blueButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Mixins.bgPrimary,
    height: 70,
  },
  squareBlueButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Mixins.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    marginRight: 10,
    marginTop: 10,
  },
  images: {
    height: 70,
    width: 70,
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  previewPhotos: {
    width: window.width * 0.8,
    height: window.height * 0.7,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: Mixins.bgButtonPrimary,
    height: 50,
    borderRadius: 100,
  },
  progressBar: {
    width: window.width * 0.8,
    height: 10,
  },
});

export default ForthDonateForm;

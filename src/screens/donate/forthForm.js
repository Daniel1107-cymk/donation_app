import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';
// style
import {Mixins} from '../../assets/mixins';

const ForthDonateForm = props => {
  const donationPhotos = useSelector(
    state => state.donationPhotosReducer.donationPhotos,
  );

  const navigateToCamera = () => {
    props.navigation.navigate('Camera');
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
                  <Image
                    key={index}
                    source={{uri: uri}}
                    style={styles.images}
                  />
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
        buttonStyle={{backgroundColor: Mixins.bgButtonPrimary}}
        containerStyle={styles.buttonContainer}
        disabled={donationPhotos.length === 0}
        disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
        disabledTitleStyle={{color: Mixins.textWhite}}
        onPress={() => {}}
      />
      <Button
        title="Back"
        buttonStyle={{backgroundColor: Mixins.bgButtonSecondary}}
        containerStyle={styles.buttonContainer}
        onPress={() => props.setSteps(props.steps - 1)}
      />
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
});

export default ForthDonateForm;

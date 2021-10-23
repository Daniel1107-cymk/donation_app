import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
// style
import {Mixins} from '../../../assets/mixins';

const window = Dimensions.get('window');

const CommunityListItem = ({item, navigation}) => {
  const navigateToCommunityDetails = () => {
    navigation.navigate('CommunityDetails', {communityId: item._id});
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `data:${item.mimetype};base64,${item.banner}`}}
        style={styles.image}
      />
      <View style={Mixins.container}>
        <Text style={{...Mixins.titleBold, textAlign: 'center'}}>
          {item.name}
        </Text>
        <Button
          title="Details"
          buttonStyle={styles.button}
          onPress={navigateToCommunityDetails}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Mixins.bgWhite,
    width: window.width * 0.8,
    height: window.height * 0.7,
    marginRight: 20,
    marginBottom: 20,
    ...Mixins.defaultShadow,
  },
  image: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  titleContainer: {
    ...Mixins.titleBold,
  },
  description: {
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: Mixins.bgButtonPrimary,
    height: 50,
    borderRadius: 100,
  },
});

export default CommunityListItem;

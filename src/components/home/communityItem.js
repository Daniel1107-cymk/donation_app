import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
// style
import {Mixins} from '../../assets/mixins';

const window = Dimensions.get('window');

const CommunityItem = ({item, navigation}) => {
  const navigateToCommunity = () => {
    navigation.navigate('Community', {communityId: item._id});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToCommunity}>
      <Image
        source={{uri: `data:${item.mimetype};base64,${item.banner}`}}
        style={styles.image}
      />
      <Text style={styles.titleContainer}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: window.width * 0.7,
    height: 100,
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Mixins.defaultShadow,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  titleContainer: {
    ...Mixins.titleBold,
  },
  description: {
    marginBottom: 15,
  },
});

export default CommunityItem;

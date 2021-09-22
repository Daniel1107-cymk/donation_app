import React from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
// style
import {Mixins} from '../../assets/mixins';

const window = Dimensions.get('window');

const QuoteCarousel = ({quoteData}) => {
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Mixins.bgWhite,
          borderRadius: 10,
          maxHeight: window.height * 0.55,
          minHeight: window.height * 0.55,
        }}>
        <ParallaxImage
          source={{uri: `data:${item.mimetype};base64,${item.image}`}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.5}
          {...parallaxProps}
        />
        <View style={styles.textContainer}>
          <Text style={Mixins.titleBold}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <Carousel
      loop={true}
      sliderWidth={window.width}
      itemWidth={window.width * 0.8}
      data={quoteData}
      renderItem={renderItem}
      hasParallaxImages={true}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  description: {
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

export default QuoteCarousel;

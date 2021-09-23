import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const window = Dimensions.get('window');

const skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.carousel} />
        <View style={styles.faqTitle} />
        <View style={styles.faqItem} />
        <View style={styles.faqItem} />
        <View style={styles.faqItem} />
        <View style={styles.faqItem} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  carousel: {
    width: window.width * 0.9,
    height: window.height * 0.55,
    borderRadius: 5,
    marginBottom: 20,
  },
  faqTitle: {
    width: 100,
    height: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  faqItem: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default skeleton;

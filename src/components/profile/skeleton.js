import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const window = Dimensions.get('window');

const skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View>
        <View style={styles.profileContainer} />
        <View style={styles.container}>
          <View style={styles.counterContainer} />
        </View>
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
  profileContainer: {
    width: '100%',
    height: 140,
    borderRadius: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  counterContainer: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginBottom: 30,
  },
  faqItem: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default skeleton;

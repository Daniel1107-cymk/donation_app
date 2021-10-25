import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const window = Dimensions.get('window');

const skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.title} />
          <View style={styles.status} />
        </View>
        <View style={styles.donationDetails} />
        <View style={styles.headerContainer}>
          <View style={styles.title} />
        </View>
        <View style={styles.donationGoods} />
        <View style={styles.headerContainer}>
          <View style={styles.title} />
        </View>
        <View style={styles.donationPhotos} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: 160,
    height: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  status: {
    width: 100,
    height: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  donationDetails: {
    width: '100%',
    height: 185,
    borderRadius: 5,
    marginBottom: 40,
  },
  donationGoods: {
    width: '100%',
    height: 80,
    borderRadius: 5,
    marginBottom: 40,
  },
  donationPhotos: {
    width: '100%',
    height: 110,
    borderRadius: 5,
    marginBottom: 40,
  },
});

export default skeleton;

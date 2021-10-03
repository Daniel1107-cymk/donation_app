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
          <View style={styles.title} />
        </View>
        <View style={styles.addressItem} />
        <View style={styles.addressItem} />
        <View style={styles.addressItem} />
        <View style={styles.addressItem} />
        <View style={styles.addressItem} />
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
    width: 120,
    height: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  addressItem: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default skeleton;

import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const window = Dimensions.get('window');

const skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.banner} />
      <View style={styles.container}>
        <View style={styles.button} />
        <View style={styles.card} />
        <View style={styles.card} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  banner: {
    width: window.width,
    height: 180,
    borderRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button: {
    borderRadius: 5,
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  card: {
    borderRadius: 5,
    height: 200,
    marginBottom: 20,
  },
});

export default skeleton;

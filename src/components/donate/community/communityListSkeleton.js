import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const window = Dimensions.get('window');

const skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.title} />
        </View>
        <View style={styles.card} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    height: window.height,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    borderRadius: 5,
    width: 200,
    height: 30,
    marginBottom: 20,
  },
  card: {
    borderRadius: 5,
    height: '82%',
    width: window.width * 0.9,
    marginBottom: 20,
  },
});

export default skeleton;

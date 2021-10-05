import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const window = Dimensions.get('window');

const skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.map} />
      <View style={styles.container}>
        <View style={styles.title} />
        <View style={styles.inputTitle} />
        <View style={styles.input} />
        <View style={styles.row}>
          <View style={{width: '48%'}}>
            <View style={styles.inputTitle} />
            <View style={styles.input} />
          </View>
          <View style={{width: '48%'}}>
            <View style={styles.inputTitle} />
            <View style={styles.input} />
          </View>
        </View>
        <View style={styles.button} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  map: {
    width: window.width,
    height: window.height * 0.45,
  },
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: 150,
    height: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputTitle: {
    width: 120,
    height: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default skeleton;

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// style
import {Mixins} from '../../assets/mixins';

const Donate = () => {
  return <SafeAreaView></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    backgroundColor: Mixins.bgPrimary,
    flexDirection: 'column',
  },
});

export default Donate;

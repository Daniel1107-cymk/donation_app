import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
// style
import {Mixins} from '../../assets/mixins';

const Home = () => {
  return <SafeAreaView></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    backgroundColor: Mixins.bgPrimary,
    flexDirection: 'column',
  },
});

export default Home;

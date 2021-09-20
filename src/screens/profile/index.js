import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// style
import {Mixins} from '../../assets/mixins';

const Profile = () => {
  return <SafeAreaView></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    backgroundColor: Mixins.bgPrimary,
    flexDirection: 'column',
  },
});

export default Profile;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// helper
import {donationStatusColor} from '../helpers/statusColor';

const CustomTextList = ({title, value, status}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.separator}>:</Text>
      <Text
        style={
          status
            ? [styles.value, {color: donationStatusColor(value)}]
            : styles.value
        }>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    width: 120,
    marginBottom: 5,
  },
  separator: {
    marginRight: 10,
    marginBottom: 5,
  },
  value: {
    flex: 1,
    marginBottom: 5,
  },
});

export default CustomTextList;

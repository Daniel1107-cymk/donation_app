import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// component
import CustomTextList from '../../customTextList';
// style
import {Mixins} from '../../../assets/mixins';

const AddressItem = ({item, navigate}) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <CustomTextList title="Recipient Name" value={item.recipient_name} />
        <CustomTextList title="Address" value={item.address.address} />
        <CustomTextList title="Date" value={item.pickup_date} />
        <CustomTextList title="Status" value={item.status} status={true} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...Mixins.defaultShadow,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: Mixins.bgWhite,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  addressText: {
    color: Mixins.textPrimary,
    marginBottom: 3,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddressItem;

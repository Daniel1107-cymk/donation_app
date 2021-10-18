import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
// component
import CustomTextList from '../../customTextList';
// style
import {Mixins} from '../../../assets/mixins';

const AddressItem = ({item, navigate}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <CustomTextList title="Recipient Name" value={item.recipientName} />
          <CustomTextList title="Address" value={item.address} />
          <CustomTextList title="Date" value={item.date} />
          <CustomTextList title="Status" value={item.status} status={true} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    marginHorizontal: 0,
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

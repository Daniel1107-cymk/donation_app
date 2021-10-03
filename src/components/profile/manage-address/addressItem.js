import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
// style
import {Mixins} from '../../../assets/mixins';

const AddressItem = ({item, toggleOverlay}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <Text style={styles.addressText}>{item.address}</Text>
          <Text style={styles.addressText}>{`City: ${item.city}`}</Text>
          <Text style={styles.addressText}>{`Zipcode: ${item.zipcode}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            TouchableComponent={TouchableOpacity}
            titleStyle={{color: Mixins.textBlue, marginLeft: 5}}
            icon={<Icon name="edit" size={20} color={Mixins.textBlue} />}
            type="clear"
          />
          <Button
            TouchableComponent={TouchableOpacity}
            icon={<Icon name="trash" size={20} color={Mixins.textRed} />}
            type="clear"
            onPress={() => toggleOverlay(item)}
          />
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

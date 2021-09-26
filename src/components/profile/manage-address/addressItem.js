import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
// style
import {Mixins} from '../../../assets/mixins';

const AddressItem = () => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={styles.addressText}>Marina Park Blok Q No. 30</Text>
          <Text style={styles.addressText}>City: Batam</Text>
          <Text style={styles.addressText}>Zipcode: 29994</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            TouchableComponent={TouchableOpacity}
            title="edit"
            titleStyle={{color: Mixins.textBlue, marginLeft: 5}}
            icon={<Icon name="edit" size={20} color={Mixins.textBlue} />}
            type="clear"
          />
          <Button
            TouchableComponent={TouchableOpacity}
            icon={<Icon name="trash" size={20} color={Mixins.textRed} />}
            type="clear"
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
});

export default AddressItem;

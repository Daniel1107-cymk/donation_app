import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Input} from 'react-native-elements';
// style
import {Mixins} from '../../assets/mixins';

const GoodsDetailItem = ({index, product, onChangeText, removeProduct}) => {
  return (
    <View style={[styles.container, {marginBottom: 20, padding: 15}]}>
      <View style={styles.row}>
        <Input
          label="Product Name*"
          value={product.product_name}
          onChangeText={text => onChangeText(index, 'product_name', text)}
          containerStyle={styles.inputContainer}
          inputContainerStyle={{...Mixins.inputTextContainer}}
          labelStyle={styles.label}
          renderErrorMessage={false}
        />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeProduct(index)}>
          <Icon name="remove-circle-outline" size={24} color={Mixins.bgRed} />
        </TouchableOpacity>
      </View>
      <Input
        label="Quantity*"
        value={product.quantity}
        onChangeText={text => onChangeText(index, 'quantity', text)}
        containerStyle={{paddingHorizontal: 0, marginBottom: 5}}
        inputContainerStyle={{...Mixins.inputTextContainer}}
        labelStyle={styles.label}
        keyboardType="number-pad"
        renderErrorMessage={false}
      />
      <Input
        label="Weight Kg"
        value={product.weight}
        onChangeText={text => onChangeText(index, 'weight', text)}
        containerStyle={{paddingHorizontal: 0, marginBottom: 5}}
        inputContainerStyle={{...Mixins.inputTextContainer}}
        labelStyle={styles.label}
        keyboardType="number-pad"
        renderErrorMessage={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.defaultShadow,
    backgroundColor: Mixins.bgWhite,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    ...Mixins.label,
    color: Mixins.textPrimary,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 5,
    marginRight: 5,
    flex: 1,
  },
  removeButton: {
    width: 40,
    height: 40,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoodsDetailItem;

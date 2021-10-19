import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/dist/Ionicons';
// component
import GoodsDetailItem from '../../components/donate/goodsDetailItem';
// style
import {Mixins} from '../../assets/mixins';

const ThirdDonateForm = props => {
  const removeProduct = index => {
    let productList = [...props.thirdForm];
    if (productList.length > 1) {
      productList.splice(index, 1);
      props.setThirdForm(productList);
    }
  };

  const addProduct = () => {
    let productList = [...props.thirdForm];
    productList.push({
      product_name: '',
      quantity: '',
      weight: '',
    });
    props.setThirdForm(productList);
  };

  const onChangeText = (index, inputKey, text) => {
    let productList = [...props.thirdForm];
    productList[index][inputKey] =
      inputKey === 'product_name' ? text : text.replace(/[^0-9]/g, '');
    props.setThirdForm(productList);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={Mixins.container}>
          <Text style={styles.title}>Goods Details</Text>
          {props.thirdForm.map((product, index) => (
            <GoodsDetailItem
              key={index}
              index={index}
              product={product}
              setThirdForm={props.setThirdForm}
              onChangeText={onChangeText}
              removeProduct={removeProduct}
            />
          ))}
          <Button
            type="clear"
            icon={
              <Icon
                name="add-circle-outline"
                size={24}
                color={Mixins.bgPrimary}
              />
            }
            containerStyle={styles.blueButton}
            onPress={addProduct}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          buttonStyle={{backgroundColor: Mixins.bgButtonPrimary}}
          containerStyle={{marginBottom: 20}}
          onPress={() => props.setSteps(props.steps + 1)}
        />
        <Button
          title="Back"
          buttonStyle={{backgroundColor: Mixins.bgButtonSecondary}}
          containerStyle={{marginBottom: 20}}
          onPress={() => props.setSteps(props.steps - 1)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Mixins.titleBold,
    color: Mixins.textPrimary,
    textAlign: 'left',
  },
  blueButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Mixins.bgPrimary,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
});

export default ThirdDonateForm;

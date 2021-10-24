import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
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

  const disableButton = () => {
    let data = props.thirdForm.find(
      el => el.product_name === '' || el.quantity === '' || el.weight === '',
    );
    if (data === undefined) {
      return false;
    } else {
      return true;
    }
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
            containerStyle={{marginBottom: 10}}
            buttonStyle={styles.blueButton}
            onPress={addProduct}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          buttonStyle={styles.button}
          containerStyle={{marginBottom: 20}}
          disabled={disableButton()}
          disabledStyle={{backgroundColor: Mixins.bgButtonSecondary}}
          disabledTitleStyle={{color: Mixins.textWhite}}
          onPress={() => props.setSteps(props.steps + 1)}
        />
        <Button
          title="Back"
          buttonStyle={{
            ...styles.button,
            backgroundColor: Mixins.bgButtonSecondary,
          }}
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
    height: 50,
    borderRadius: 100,
    borderColor: Mixins.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Mixins.bgButtonPrimary,
    height: 50,
    borderRadius: 100,
  },
});

export default ThirdDonateForm;

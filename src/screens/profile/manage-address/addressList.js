import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
// component
import AddressItem from '../../../components/profile/manage-address/addressItem';
// style
import {Mixins} from '../../../assets/mixins';

const AddressList = () => {
  const [addressList, setAddressList] = useState(null);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Address List</Text>
          <Button title="+ new address" />
        </View>
        <AddressItem />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
});

export default AddressList;

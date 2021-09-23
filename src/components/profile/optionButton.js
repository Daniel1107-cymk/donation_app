import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// style
import {Mixins} from '../../assets/mixins';

const OptionButton = ({icon, title, navigate}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={navigate ?? null}>
      <Icon name={icon} size={20} color={Mixins.bgPrimary} />
      <Text style={{marginLeft: 20}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default OptionButton;

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// style
import {Mixins} from '../../assets/mixins';

const FaqItem = ({item}) => {
  const [expand, setExpand] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setExpand(!expand)}>
      <View style={styles.titleContainer}>
        <Text style={Mixins.title}>{item.title}</Text>
        <Icon name="chevron-down" size={20} color={Mixins.textPrimary} />
      </View>
      {expand && <Text style={styles.description}>{item.description}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    paddingVertical: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginBottom: 15,
  },
});

export default FaqItem;

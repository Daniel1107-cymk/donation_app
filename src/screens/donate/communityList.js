import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
// component
import CommunityListItem from '../../components/donate/community/communityListItem';
// helper
import {get} from '../../helpers/network';
import {forceLogout} from '../../helpers/logout';
// style
import {Mixins} from '../../assets/mixins';

const CommunityList = props => {
  const [communityData, setCommunityData] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
  });

  const getCommunity = async () => {
    const result = await get('community');
    if (result.success) {
      setCommunityData(result.data);
      setFlag(prevFlag => ({
        ...prevFlag,
        isLoading: false,
      }));
    } else {
      if (result.status === 401 && result.redirect === true) {
        await forceLogout({navigation: props.navigation});
      }
    }
  };

  useEffect(async () => {
    await getCommunity();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Mixins.bgWhite}}>
      {flag.isLoading ? (
        <View />
      ) : (
        <View style={styles.container}>
          <View style={styles.communityContainer}>
            <Text style={{...Mixins.title, textAlign: 'center'}}>
              Communities
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {communityData !== null &&
              communityData.map(item => (
                <CommunityListItem
                  key={item._id}
                  item={item}
                  navigation={props.navigation}
                />
              ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  communityContainer: {
    paddingVertical: 5,
  },
});

export default CommunityList;

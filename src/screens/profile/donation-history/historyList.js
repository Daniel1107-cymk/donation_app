import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// component
import HistoryItem from '../../../components/profile/donation-history/historyItem';
import Skeleton from '../../../components/profile/donation-history/skeleton';
// helper
import {get, remove} from '../../../helpers/network';
import {forceLogout} from '../../../helpers/logout';
// style
import {Mixins} from '../../../assets/mixins';

const HistoryList = props => {
  const [donationHistoryList, setDonationHistoryList] = useState(dummy);
  const [flag, setFlag] = useState({
    isLoading: true,
    isShowOverlay: false,
  });

  const navigateToHistoryDetails = data => {
    props.navigation.navigate('AddressForm');
  };

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      setFlag(prevFlag => ({
        ...prevFlag,
        isLoading: false,
      }));
    });
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Donation History</Text>
          </View>
          <FlatList
            data={donationHistoryList}
            renderItem={({item}) => (
              <HistoryItem item={item} navigate={navigateToHistoryDetails} />
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const dummy = [
  {
    recipientName: 'Aming Lim',
    address: 'Marina Park Blok Q No 30',
    date: Date.now(),
    status: 'Completed',
  },
];

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    backgroundColor: Mixins.bgButtonPrimary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  buttonYes: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: Mixins.bgHeader,
    borderRadius: 5,
  },
  buttonNo: {
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Mixins.bgHeader,
    borderRadius: 5,
  },
});

export default HistoryList;

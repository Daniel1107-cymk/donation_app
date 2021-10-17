import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
// component
import QuoteCarousel from '../../components/home/quoteCarousel';
import FaqItem from '../../components/home/faqItem';
import CommunityItem from '../../components/donate/community/communityItem';
import Skeleton from '../../components/home/skeleton';
// helper
import {get} from '../../helpers/network';
import {forceLogout} from '../../helpers/logout';
// style
import {Mixins} from '../../assets/mixins';

const Home = props => {
  const [quoteData, setQuoteData] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [communityData, setCommunityData] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
  });

  const getQuote = async () => {
    const result = await get('quote');
    if (result.success) {
      setQuoteData(result.data);
    } else {
      if (result.status === 401 && result.redirect === true) {
        await forceLogout({navigation: props.navigation});
      }
    }
  };

  const getFaqData = async () => {
    const result = await get('faq');
    if (result.success) {
      setFaqData(result.data);
    } else {
      if (result.status === 401 && result.redirect === true) {
        await forceLogout({navigation: props.navigation});
      }
    }
  };

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
    await getFaqData();
    await getQuote();
    await getCommunity();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Mixins.bgWhite}}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {quoteData !== null && <QuoteCarousel quoteData={quoteData} />}
          <View style={styles.faqContainer}>
            <View style={styles.communityContainer}>
              <Text style={Mixins.title}>Communities</Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {communityData !== null &&
                communityData.map(item => (
                  <CommunityItem
                    key={item._id}
                    item={item}
                    navigation={props.navigation}
                  />
                ))}
            </ScrollView>
            <View style={styles.faqTitleContainer}>
              <Text style={Mixins.title}>FAQ</Text>
            </View>
            {faqData !== null &&
              faqData.map(item => <FaqItem key={item._id} item={item} />)}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  faqTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    paddingVertical: 5,
  },
  faqContainer: {
    backgroundColor: Mixins.bgWhite,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  communityContainer: {
    paddingVertical: 5,
  },
  communityItem: {
    marginBottom: 20,
  },
});

export default Home;

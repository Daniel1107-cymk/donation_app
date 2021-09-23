import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
// component
import QuoteCarousel from '../../components/home/quoteCarousel';
import FaqItem from '../../components/home/faqItem';
import Skeleton from '../../components/home/skeleton';
// helper
import {get} from '../../helpers/network';
// style
import {Mixins} from '../../assets/mixins';

const Home = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
  });

  const getQuote = async () => {
    const result = await get('quote');
    if (result.success) {
      setQuoteData(result.data);
      setFlag(prevFlag => ({
        ...prevFlag,
        isLoading: false,
      }));
    }
  };

  const getFaqData = async () => {
    const result = await get('faq');
    if (result.success) {
      setFaqData(result.data);
    }
  };

  useEffect(async () => {
    await getFaqData();
    await getQuote();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Mixins.bgWhite}}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {quoteData !== null && <QuoteCarousel quoteData={quoteData} />}
          <View style={styles.faqContainer}>
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
});

export default Home;

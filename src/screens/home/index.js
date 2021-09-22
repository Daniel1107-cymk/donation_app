import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// component
import QuoteCarousel from '../../components/home/quoteCarousel';
import FaqItem from '../../components/home/faqItem';
// helper
import {get} from '../../helpers/network';
// style
import {Mixins} from '../../assets/mixins';

const Home = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [faqData, setFaqData] = useState(null);

  const getQuote = async () => {
    const result = await get('quote');
    if (result.success) {
      setQuoteData(result.data);
    }
  };

  const getFaqData = async () => {
    const result = await get('faq');
    if (result.success) {
      setFaqData(result.data);
    }
  };

  useEffect(() => {
    getQuote();
    getFaqData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {quoteData !== null && <QuoteCarousel quoteData={quoteData} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  faqContainer: {
    backgroundColor: 'red',
    margin: 20,
  },
});

export default Home;

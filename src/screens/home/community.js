import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
// component
import Skeleton from '../../components/home/community/skeleton';
// helper
import {get} from '../../helpers/network';
// style
import {Mixins} from '../../assets/mixins';

const window = Dimensions.get('window');

const Community = props => {
  const [communityData, setCommunityData] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
  });

  const getCommunity = async () => {
    const result = await get(`community/${props.route.params?.communityId}`);
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
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bannerContainer}>
            <Image
              source={{
                uri: `data:${communityData.mimetype};base64,${communityData.banner}`,
              }}
              style={styles.banner}
            />
            <Text style={Mixins.titleBold}>{communityData.name}</Text>
          </View>
          <View style={styles.container}>
            <Button
              title="Donate"
              buttonStyle={styles.button}
              icon={
                <Icon
                  name="hand-holding-heart"
                  size={20}
                  color={'#FFF'}
                  style={{marginRight: 5}}
                />
              }
            />
            <Card containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>About Our Community</Text>
              <Text style={styles.cardText}>{communityData.about}</Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
              <Text style={styles.cardTitle}>Contact Us</Text>
              <Text style={styles.cardTextBold}>Email</Text>
              <Text style={styles.cardText}>{communityData.email}</Text>
              <Text style={styles.cardTextBold}>Contact Number</Text>
              <Text style={styles.cardText}>
                {communityData.contact_number}
              </Text>
              <Text style={styles.cardTextBold}>Address</Text>
              <Text style={styles.cardText}>{communityData.address}</Text>
            </Card>
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
  bannerContainer: {
    width: window.width,
    height: 180,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  banner: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button: {
    backgroundColor: Mixins.bgButtonPrimary,
  },
  cardContainer: {
    borderRadius: 5,
    marginHorizontal: 0,
  },
  cardTitle: {
    ...Mixins.titleBold,
    textAlign: 'center',
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  cardTextBold: {
    ...Mixins.textBold,
    textAlign: 'center',
  },
});

export default Community;

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
// component
import CustomTextList from '../../../components/customTextList';
import Skeleton from '../../../components/profile/donation-history/detail/skeleton';
// helper
import {get} from '../../../helpers/network';
import {forceLogout} from '../../../helpers/logout';
import {donationStatusColor} from '../../../helpers/statusColor';
import Format from '../../../helpers/format';
// style
import {Mixins} from '../../../assets/mixins';

const DonationDetails = props => {
  const [donationData, setDonationData] = useState(null);
  const [flag, setFlag] = useState({
    isLoading: true,
  });

  const getDonationDetails = async () => {
    const donationId = props.route.params?.donationId ?? null;
    if (donationId !== null) {
      const result = await get(`donation/${donationId}`);
      console.log(result);
      if (result.success) {
        setDonationData(result.data);
        setFlag(prevFlag => ({
          ...prevFlag,
          isLoading: false,
        }));
      } else {
        if (result.status === 401 && result.redirect === true) {
          await forceLogout({navigation: props.navigation});
        }
      }
    }
  };

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      await getDonationDetails();
    });
  }, []);

  return (
    <SafeAreaView style={Mixins.defaultBg}>
      {flag.isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Donation Details</Text>
            <View
              style={{
                ...styles.statusContainer,
                backgroundColor: donationStatusColor(donationData.status),
              }}>
              <Text style={{color: Mixins.textWhite}}>
                {donationData.status}
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <CustomTextList
              title="Community"
              value={donationData.community.name}
            />
            <CustomTextList
              title="Recipient Name"
              value={donationData.recipient_name}
            />
            <CustomTextList
              title="Address"
              value={donationData.address.address}
            />
            <CustomTextList
              title="Phone Number"
              value={donationData.phone_number}
            />
            <CustomTextList
              title="Pickup Date"
              value={Format.formatDate(donationData.pickup_date)}
            />
            <CustomTextList title="Category" value={donationData.category} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Donation Goods</Text>
          </View>
          <View style={{...styles.cardContainer, padding: 0}}>
            <View style={styles.tableHeader}>
              <View style={styles.firstColumn}>
                <Text>Name</Text>
              </View>
              <View style={styles.columnQty}>
                <Text>Qty</Text>
              </View>
              <View style={styles.column}>
                <Text>Weight/gram</Text>
              </View>
            </View>
            <View style={styles.table}>
              {donationData.donation_details.map((detail, index) => {
                return (
                  <View key={index} style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.firstColumn}>
                      <Text>{detail.product_name}</Text>
                    </View>
                    <View style={styles.columnQty}>
                      <Text style={{textAlign: 'center'}}>
                        {detail.quantity}
                      </Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={{textAlign: 'center'}}>{detail.weight}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Donation Photos</Text>
          </View>
          <View style={styles.photoContainer}>
            {donationData.donation_images.map((item, index) => (
              <Image
                key={index}
                source={{uri: `data:${item.mimetype};base64,${item.image}`}}
                style={styles.images}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  cardContainer: {
    ...Mixins.defaultShadow,
    backgroundColor: Mixins.bgWhite,
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: Mixins.bgButtonSecondary,
  },
  table: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  firstColumn: {
    width: '50%',
    color: Mixins.textPrimary,
  },
  columnQty: {
    width: '20%',
    color: Mixins.textPrimary,
    alignItems: 'center',
  },
  column: {
    width: '30%',
    color: Mixins.textPrimary,
  },
  photoContainer: {
    ...Mixins.defaultShadow,
    backgroundColor: Mixins.bgWhite,
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  images: {
    height: 70,
    width: 70,
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 10,
    marginTop: 10,
  },
});

export default DonationDetails;

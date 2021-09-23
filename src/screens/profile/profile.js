import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
// component
import OptionButton from '../../components/profile/optionButton';
// style
import {Mixins} from '../../assets/mixins';

const Profile = () => {
  const [flag, setFlag] = useState({
    isLoading: true,
  });

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: '#ABABAB',
            }}
          />
          <View style={{marginLeft: '5%'}}>
            <Text style={Mixins.title}>Username</Text>
            <Text>email@gmail.com</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.counterContainer}>
            <Text style={Mixins.textBoldWhite}>
              Total donation you've been made
            </Text>
            <Text style={styles.counterText}>15</Text>
            <Text style={Mixins.textBoldWhite}>Thank you very much</Text>
          </View>
        </View>
        <View>
          <Text style={[Mixins.title, {marginHorizontal: 20}]}>Options</Text>
          <OptionButton
            icon="list-alt"
            title="Manage Address"
            navigate={() => {}}
          />
          <OptionButton
            icon="history"
            title="Donation History"
            navigate={() => {}}
          />
          <OptionButton
            icon="sign-out-alt"
            title="Logout"
            navigate={() => {}}
          />
        </View>
        <Text
          style={{
            color: Mixins.textSecondary,
            textAlign: 'right',
            marginRight: 20,
          }}>
          Version {DeviceInfo.getVersion()}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.container,
    flexDirection: 'column',
  },
  profileContainer: {
    padding: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    ...Mixins.defaultShadow,
  },
  counterContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Mixins.bgPrimary,
    borderRadius: 5,
  },
  counterText: {
    fontSize: 24,
    color: Mixins.textWhite,
  },
});

export default Profile;

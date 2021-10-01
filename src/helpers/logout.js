import Session from './session';
import {CommonActions} from '@react-navigation/native';

export const forceLogout = async ({navigation}) => {
  await Session.removeValue('token');
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Login'}],
    }),
  );
};

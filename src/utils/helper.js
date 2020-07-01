import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {setToken} from '../store/action/setToken';
import {StackActions} from '@react-navigation/native';
import {setLoginState} from '../store/action/setLoginState';

export const showToast = (massage) => {
  Toast.show({
    text: massage,
    textStyle: {
      color: '#fff',
      fontSize: '20',
    },
    duration: 2000,
  });
};

export const tokenGenerator = () => {
  const randomString =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var token = '';
  var length = randomString.length;
  for (var i = 0; i < length; i++) {
    token += randomString.charAt(Math.floor(Math.random() * length));
  }
  return token;
};

export const otpGenerator = () => {
  const randomString = '1234567890';
  var token = '';
  var length = randomString.length;
  for (var i = 0; i < 6; i++) {
    token += randomString.charAt(Math.floor(Math.random() * length));
  }
  return token;
};
export const logout = (props) => {
  AsyncStorage.clear();
  props.dispatch(setToken(''));
  props.dispatch(setLoginState('false'));
  props.navigation.dispatch(StackActions.replace('Login'));
};

import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import baseStyle from '../../config/baseStyle';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-community/async-storage';
import keys from '../../config/keys';
export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.getUserData();
  }

  getUserData = async () => {
    const userData = await AsyncStorage.getItem(keys.userData);
    console.log(userData);
    if (userData !== null) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('Login');
    }
  };
  render() {
    return (
      <ActivityIndicator
        color={colors.colorAccent}
        size="large"
        style={{...baseStyle.container}}
      />
    );
  }
}

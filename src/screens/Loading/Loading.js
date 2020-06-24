import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import baseStyle from '../../config/baseStyle';
import colors from '../../config/colors';
export default class Loading extends Component {
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

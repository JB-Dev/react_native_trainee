import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {floor} from 'react-native-reanimated';
export default class Splash extends Component {
  render() {
    return <ActivityIndicator size="large" style={{flex: 1}} />;
  }
}

import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'native-base';

export default class Details extends Component {
  render() {
    return (
      <TouchableOpacity>
        <Text>Details!</Text>
      </TouchableOpacity>
    );
  }
}

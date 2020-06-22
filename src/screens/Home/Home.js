import React, {Component} from 'react';
import {View, Text} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details')}>
          <Text>Goto details</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

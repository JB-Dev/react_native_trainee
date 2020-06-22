import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

export default class Profile extends Component {
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Home', {screen: 'Details'})
          }>
          <Text>Profile!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import constants from './src/config/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.tinyLogo} source={{uri: constants.IMG_URI}} />
        <Text>React Native</Text>
      </SafeAreaView>
    );
  }
}

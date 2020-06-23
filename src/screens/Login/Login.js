import React, {Component} from 'react';
import baseStyle from '../../config/baseStyle';
import colors from '../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SubmitButton} from '../../components/submitButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  renderLogoView() {
    return (
      <View style={styles.logo}>
        <Text style={{...styles.logo, ...baseStyle.textTitle}}>
          Trainee App
        </Text>
        {/* <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        /> */}
      </View>
    );
  }

  handleSubmit() {
    if (this.state.email !== '' && this.state.password !== '') {
      Alert.alert('Login Success ' + this.state.email);
    } else {
      Alert.alert('Enter Valid Credential');
    }
  }

  renderCredentialView() {
    return (
      <View style={{...styles.credentialContainer}}>
        <TextInput
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Email"
          placeholderTextColor="#fff"
          style={styles.emailView}
        />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#fff"
          style={styles.emailView}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{...baseStyle.container}}>
        <View>{this.renderLogoView()}</View>
        <View marginTop={10}>{this.renderCredentialView()}</View>
        <View>
          <SubmitButton text="LOGIN" action={() => this.handleSubmit()} />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: '30%',
  },
  emailView: {
    backgroundColor: colors.colorBackground,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    height: 50,
    padding: 10,
    zIndex: 10,
    ...baseStyle.textInput,
  },
});

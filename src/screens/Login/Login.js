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
  Keyboard,
} from 'react-native';
import {SubmitButton} from '../../components/submitButton';
import {BackButton} from '../../components/backButton';
import strings from '../../config/strings';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleBack() {
    this.props.navigation.goBack();
  }

  renderLogoView() {
    return (
      <View style={styles.logo}>
        <Text style={{...styles.logo, ...baseStyle.textTitle}}>
          Welcome Back!
        </Text>
      </View>
    );
  }

  handleSignUp() {
    this.props.navigation.navigate('SignUp');
  }
  handleSubmit() {
    Keyboard.dismiss();
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

  renderSignUpView() {
    return (
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => this.handleSignUp()}>
        <Text style={{...baseStyle.textInput}}>
          {strings.noAccount}
          <Text style={{color: colors.colorAccent}}>{strings.signUp}</Text>
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <SafeAreaView style={{...baseStyle.container}}>
        {/* <View>
          <BackButton action={() => this.handleBack()} />
        </View> */}
        <View>{this.renderLogoView()}</View>
        <View marginTop={10}>{this.renderCredentialView()}</View>
        <SubmitButton text="LOGIN" action={() => this.handleSubmit()} />
        <View>{this.renderSignUpView()}</View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: '30%',
    marginBottom: 10,
  },
  emailView: {
    backgroundColor: colors.colorBackground,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    height: 50,
    padding: 10,
    zIndex: 10,
    ...baseStyle.textInput,
  },
});

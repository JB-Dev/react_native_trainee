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
import keys from '../../config/keys';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions} from 'react-navigation';
import {StackActions} from '@react-navigation/native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Softices@gmail.com',
      password: '12345678',
      userDetails: '',
    };
    this.getUserData();
  }

  getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem(keys.userData);
      if (userData !== null) {
        this.setState({
          userDetails: JSON.parse(userData),
          // email: userDetails.email,
          // password: userDetails.password,
        });
      } else {
        Alert.alert(strings.somethingWrong);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    const data = this.state.userDetails;
    if (
      this.state.email !== '' &&
      this.state.password !== '' &&
      this.state.email == data.email &&
      this.state.password == data.password
    ) {
      this.props.navigation.dispatch(StackActions.replace('Home'));
    } else {
      Alert.alert('Enter Valid Credential');
    }
  }

  renderCredentialView() {
    return (
      <View style={{...styles.credentialContainer}}>
        <TextInput
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Email"
          placeholderTextColor="#fff"
          style={styles.emailView}
        />
        <TextInput
          value={this.state.password}
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

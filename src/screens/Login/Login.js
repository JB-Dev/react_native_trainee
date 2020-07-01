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
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {SubmitButton} from '../../components/submitButton';
import strings from '../../config/strings';
import keys from '../../config/keys';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
import {setToken} from '../../store/action/setToken';
import {setLoginState} from '../../store/action/setLoginState';
import {Root} from 'native-base';
import {connect} from 'react-redux';
import {tokenGenerator} from '../../utils/helper';
import Firebase from '../../../Firebase';
import database from '@react-native-firebase/database';

class Login extends Component {
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
      console.log(userData);
      if (userData !== null) {
        this.setState({
          userDetails: JSON.parse(userData),
        });
      } else {
        console.log(strings.somethingWrong);
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
    console.log(data);
    if (
      this.state.email == data.email &&
      this.state.password == data.password
    ) {
      AsyncStorage.setItem(keys.accessToken, tokenGenerator());
      this.props.dispatch(setToken(tokenGenerator()));
      this.props.dispatch(setLoginState('true'));
      this.props.navigation.dispatch(StackActions.replace('Home'));
    } else {
      // Alert.alert('Enter Valid Credential');
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
      <Root>
        <SafeAreaView style={{...baseStyle.container}}>
          {/* <View>
            <BackButton action={() => this.handleBack()} />
          </View> */}
          <View>{this.renderLogoView()}</View>
          <View marginTop={10}>{this.renderCredentialView()}</View>
          <SubmitButton text="LOGIN" action={() => this.handleSubmit()} />
          <View>{this.renderSignUpView()}</View>
        </SafeAreaView>
      </Root>
    );
  }
}
function mapStateToProps(state) {
  const {tokenReducer} = state;
  return {
    token: tokenReducer,
  };
}
export default connect(mapStateToProps)(Login);
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

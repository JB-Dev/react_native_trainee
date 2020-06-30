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
      userInfo: null,
      googleToken: null,
      gettingLoginStatus: true,
      user_name: '',
      token: null,
      profile_pic: '',
      createUserData: null,
    };
    this.getUserData();
  }

  setGoogleUser() {
    const provider = auth.GoogleAuthProvider;
    const credential = provider.credential(this.state.googleToken);
    auth()
      .signInWithCredential(credential)
      .then((data) => {
        console.log('SUCCESS', data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        '363312574351-k0shud1r5pupnp70s0kqvm8bpfpf6c5h.apps.googleusercontent.com',
    });
    //Check if user is already signed in
    this._isSignedIn();
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({gettingLoginStatus: false});
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({userInfo: userInfo});
      this.createUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        // alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({
        userInfo: userInfo,
        googleToken: userInfo.idToken,
      });

      this.setGoogleUser();
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  createUser = (userInfo) => {
    var userID = auth().currentUser.uid;
    var userEmail = auth().currentUser;
    var ref = database().ref(`/users/${userID}`);
    ref.once('value').then(function (snapshot) {
      var a = snapshot.exists();
      if (a) {
        console.log('already a member');
      } else {
        database()
          .ref(`/users/${userID}`)
          .set({
            name: userEmail.displayName,
            email: userEmail.email,
            profile_pic: userInfo.user.photo,
          })
          .then(() => console.log('data set'));
      }
    });
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userInfo: null}); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

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
    if (this.state.gettingLoginStatus) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.colorAccent} />
        </View>
      );
    } else {
      if (this.state.userInfo != null) {
        //Showing the User detail
        return (
          <View>
            {this.props.navigation.dispatch(StackActions.replace('Home'))}
          </View>
        );
      } else {
        return (
          <SafeAreaView>
            <GoogleSigninButton
              style={{
                width: 200,
                height: 40,
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
            />
          </SafeAreaView>
        );
        // } else {
        //   return (
        //     <Root>
        //       <SafeAreaView style={{...baseStyle.container}}>
        //         {/* <View>
        //     <BackButton action={() => this.handleBack()} />
        //   </View> */}
        //         <View>{this.renderLogoView()}</View>
        //         <View marginTop={10}>{this.renderCredentialView()}</View>
        //         <SubmitButton text="LOGIN" action={() => this.handleSubmit()} />
        //         <View>{this.renderSignUpView()}</View>
        //       </SafeAreaView>
        //     </Root>
        //   );
      }
    }
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

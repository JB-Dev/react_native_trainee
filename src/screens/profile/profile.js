import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../config/colors';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: true,
      user_name: '',
      token: null,
      profile_pic: '',
    };
  }

  renderGoogleSignInData() {}
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
      alert('User is already signed in');
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
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
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
      this.setState({userInfo: userInfo});
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

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      alert(JSON.stringify(result));
      this.setState({user_name: 'Welcome' + ' ' + result.name});
      this.setState({token: 'User Token: ' + ' ' + result.id});
      this.setState({profile_pic: result.picture.data.url});
    }
  };

  onLogout = async () => {
    //Clear the state after logout
    this.setState({
      user_name: null,
      token: null,
      profile_pic: null,
    });
  };

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
          <View style={styles.container}>
            <Image
              source={{uri: this.state.userInfo.user.photo}}
              style={styles.imageStyle}
            />
            <Text style={styles.text}>
              Name: {this.state.userInfo.user.name}
            </Text>
            <Text style={styles.text}>
              Email: {this.state.userInfo.user.email}
            </Text>
            <TouchableOpacity style={styles.button} onPress={this._signOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (this.state.token !== null) {
        return (
          <View>
            {this.state.profile_pic ? (
              <Image
                source={{uri: this.state.profile_pic}}
                style={styles.imageStyle}
              />
            ) : null}
            <Text style={styles.text}> {this.state.user_name} </Text>
            <Text> {this.state.token} </Text>
            <LoginButton onLogoutFinished={this.onLogout} />
          </View>
        );
      } else {
        return (
          <SafeAreaView style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <LoginButton
                readPermissions={['public_profile email']}
                onLoginFinished={(error, result) => {
                  if (error) {
                    alert(error);
                    alert('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    alert('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                      alert(data.accessToken.toString());
                      this.setState({
                        token: data.accessToken.toString(),
                      });
                      const processRequest = new GraphRequest(
                        '/me?fields=name,picture.type(large)',
                        null,
                        this.get_Response_Info,
                      );
                      // Start the graph request.
                      new GraphRequestManager()
                        .addRequest(processRequest)
                        .start();
                    });
                  }
                }}
                onLogoutFinished={this.onLogout}
              />
              <GoogleSigninButton
                style={{
                  width: 200,
                  height: 40,
                  borderRadius: 10,
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
              />
            </View>
          </SafeAreaView>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    color: '#329BFF',
    paddingStart: 8,
    borderBottomColor: '#329BFF',
  },
  grediant: {
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 40,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  grediantGoogle: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 40,
  },
  text: {
    color: '#000',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
});

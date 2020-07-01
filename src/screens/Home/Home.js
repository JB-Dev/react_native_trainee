import React, {Component} from 'react';
import {View, Text, Button, Alert, StyleSheet, Keyboard} from 'react-native';
import {
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {logout, otpGenerator} from '../../utils/helper';
import {Root} from 'native-base';
import SendSMS from 'react-native-sms';
import RNOtpVerify from 'react-native-otp-verify';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      text: '',
      otp: '',
    };
  }

  getHash = () => RNOtpVerify.getHash().then(console.log).catch(console.log);

  componentDidMount() {
    this.getHash();
    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(this.otpHandler))
      .catch((p) => console.log(p));
  }

  otpHandler = (message: string) => {
    const otp = /(\d{6})/g.exec(message)[1];
    this.setState({otp: otp});
    console.log(otp);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };

  componentWillUnmount() {
    RNOtpVerify.removeListener();
  }
  onChangeText = (value) => {
    this.setState({
      text: value,
    });
  };

  someFunction() {
    const body =
      '<#> Welcome to AwsomeProject. Your verification code is ' +
      otpGenerator() +
      '\n\noBpYXYpAYNu';
    SendSMS.send(
      {
        //Message body
        body: body,
        //Recipients Number
        recipients: ['7600726979'],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }
  handleOtp() {
    if (this.state.mobileNumber.length === 10) {
      // AsyncStorage.setItem(keys.accessToken, otpGenerator());
      this.props.navigation.navigate('OtpVerification', {otp: otpGenerator()});
    } else {
      Alert.alert('Enter Valid Number');
    }
  }
  render() {
    return (
      <Root>
        <SafeAreaView style={{flex: 1}}>
          <View>
            <TouchableOpacity onPress={() => logout(this.props)}>
              {/* <Text>{this.props.token}</Text> */}
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'flex-end',
                  marginEnd: 20,
                  color: 'red',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Enter One Time Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="OTP"
              maxLength={6}
              onChangeText={this.onChangeText}
              value={this.state.otp}
            />
          </View>
          <View style={{alignSelf: 'center'}}>
            <View>
              <TextInput
                placeholder="Enter 10 digit mobile number"
                maxLength={10}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  this.setState({
                    mobileNumber: text,
                  });
                }}
                style={{
                  fontSize: 18,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
          <View>
            <Button
              title="Submit"
              onPress={() => {
                this.someFunction();
              }}></Button>
          </View>
        </SafeAreaView>
      </Root>
    );
  }
}
function mapStateToProps(state) {
  const {tokenReducer} = state;
  const {loginReducer} = state;

  return {
    token: tokenReducer,
    isLoggedIn: loginReducer,
  };
}
export default connect(mapStateToProps)(Home);
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 20,
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

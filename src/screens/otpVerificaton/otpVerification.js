import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: this.props.route.params.otp,
    };
  }
  render() {
    return (
      <SafeAreaView>
        {/* <Text style={{alignSelf: 'center', fontSize: 20}}></Text> */}
        <OTPInputView
          pinCount={6}
          autoFocusOnLoad
          style={{
            width: '80%',
            height: 200,
            alignSelf: 'center',
            fontSize: 20,
            color: '#000',
          }}
          code={this.state.otp}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    color: '#000',
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

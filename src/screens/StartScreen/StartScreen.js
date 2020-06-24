import React, {Component} from 'react';
import {View} from 'native-base';
import baseStyle from '../../config/baseStyle';
import {SubmitButton} from '../../components/submitButton';
export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLoginEvent() {
    this.props.navigation.navigate('Login');
  }
  handleSignUpEvent() {
    this.props.navigation.navigate('SignUp');
  }
  render() {
    return (
      <View style={{...baseStyle.container, justifyContent: 'center'}}>
        <SubmitButton
          text="Login"
          action={() => this.handleLoginEvent()}></SubmitButton>
        <SubmitButton
          text="Sign Up"
          action={() => this.handleSignUpEvent()}></SubmitButton>
      </View>
    );
  }
}

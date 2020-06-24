import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import baseStyle from '../../config/baseStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../config/colors';
import strings from '../../config/strings';
import {SubmitButton} from '../../components/submitButton';
import RNPickerSelect from 'react-native-picker-select';
import stylePicker from './stylePicker';
import {BackButton} from '../../components/backButton';
import keys from '../../config/keys';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      phonenumber: '',
      gender: '',
      genderChoice: [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
      ],
    };
  }

  renderHeaderView() {
    return (
      <View style={{alignSelf: 'center', marginBottom: 20}}>
        <Text style={{...baseStyle.textTitle}}>Create Account</Text>
      </View>
    );
  }

  renderNameView() {
    return (
      <View>
        <View>
          {/* <Text style={{...styles.textInputText}}>{strings.Name}</Text> */}
          <TextInput
            style={{...styles.textInput}}
            placeholder="Enter Name"
            placeholderTextColor={colors.colorWhite}
            onChangeText={(text) =>
              this.setState({
                name: text,
              })
            }></TextInput>
        </View>
      </View>
    );
  }
  renderEmailView() {
    return (
      <View>
        <View>
          {/* <Text style={{...styles.textInputText}}>{strings.Email}</Text> */}
          <TextInput
            style={{...styles.textInput}}
            placeholder="Enter Email"
            keyboardType="email-address"
            placeholderTextColor={colors.colorWhite}
            onChangeText={(text) =>
              this.setState({
                email: text,
              })
            }></TextInput>
        </View>
      </View>
    );
  }
  renderPhoneView() {
    return (
      <View>
        <View>
          {/* <Text style={{...styles.textInputText}}>{strings.Phone}</Text> */}
          <TextInput
            style={{...styles.textInput}}
            placeholder="Enter Phone"
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor={colors.colorWhite}
            onChangeText={(text) =>
              this.setState({
                phonenumber: text,
              })
            }></TextInput>
        </View>
      </View>
    );
  }
  renderGenderView() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...styles.textInputText}}>{strings.Gender}</Text>
          <View padding={10}>
            <RNPickerSelect
              placeholder={{}}
              items={this.state.genderChoice}
              onValueChange={(value) => {
                this.setState({gender: value});
              }}
              style={{
                ...stylePicker,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
  renderPasswordView() {
    return (
      <View>
        <View>
          {/* <Text style={{...styles.textInputText}}>{strings.Password}</Text> */}
          <TextInput
            style={{...styles.textInput}}
            placeholder="Enter Password"
            secureTextEntry={true}
            placeholderTextColor={colors.colorWhite}
            onChangeText={(text) =>
              this.setState({
                password: text,
              })
            }></TextInput>
        </View>
      </View>
    );
  }

  handleSubmit() {
    Keyboard.dismiss();
    var user_details = {};
    user_details.name = this.state.name;
    user_details.email = this.state.email;
    user_details.phonenumber = this.state.phonenumber;
    user_details.gender = this.state.gender;
    user_details.password = this.state.password;
    AsyncStorage.setItem(keys.user_details, JSON.stringify(user_details));
  }
  handleBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <SafeAreaView style={{...baseStyle.container}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 20}}>
            <BackButton action={() => this.handleBack()} />
          </View>
          {this.renderHeaderView()}
          {this.renderNameView()}
          {this.renderEmailView()}
          {this.renderPhoneView()}
          {this.renderGenderView()}
          {this.renderPasswordView()}
          <SubmitButton
            text={strings.createAccount}
            action={() => this.handleSubmit()}></SubmitButton>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  textInputText: {
    marginHorizontal: 20,
    marginVertical: 10,
    ...baseStyle.textInput,
  },
  textInput: {
    backgroundColor: colors.colorBackground,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    color: colors.colorWhite,
    marginVertical: 10,
    ...baseStyle.textInput,
  },
});

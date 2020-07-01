import React, {Component} from 'react';
import {Platform, View, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Firebase from '../../../Firebase';

export default class FirebaseGroupChat extends Component {
  state = {
    messages: [],
  };
  get user() {
    return {
      _id: Firebase.uid,
    };
  }
  componentDidMount() {
    Firebase.getMessages((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );
  }

  componentWillUnmount() {
    Firebase.offDbUseres();
  }
  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.sendMessages}
        user={this.user}
      />
    );
    return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
  }
}

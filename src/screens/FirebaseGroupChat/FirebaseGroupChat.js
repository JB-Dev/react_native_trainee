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
    // (sid = 'UcPt0oNoNNhkP0rHEBMpTp5T8Xf1'),
    //   (rid = '6eSWmcV7N5NDMvXkLAGJOaNdNTx2'),
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

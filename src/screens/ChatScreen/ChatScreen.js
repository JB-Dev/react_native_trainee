import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Firebase from '../../../Firebase';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      reciverId: this.props.route.params.uid,
      senderId: '',
      name: this.props.route.params.reciverName,
      text: '',
    };
  }

  componentDidMount() {
    this.setState({
      senderId: auth().currentUser.uid,
    });
    this.getMessages((message) => {
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }));
    });
  }

  parseMessage = (mes) => {
    const {user, text, timestamp} = mes.val();
    const {key: _id} = mes;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  getMessages = (callback, senderId, reciverId) => {
    this.dbMessages(senderId, reciverId).on('child_added', (snapshot) =>
      callback(this.parseMessage(snapshot)),
    );
  };

  //get child messages
  dbMessages = (senderId, reciverId) => {
    return database().ref(`/users/${senderId}/${reciverId}/messageList/`);
  };

  isSend() {
    const message = {
      text: this.state.text.trim(),
      timestamp: database.ServerValue.TIMESTAMP,
      user: this.state.senderId,
    };
    console.log('reciver:', this.state.reciverId);
    console.log('sender:', this.state.senderId);

    database()
      .ref(`/users/${this.state.senderId}/${this.state.reciverId}/messageList`)
      .push(message)
      .then(() => console.log('data set'));
  }
  //   componentWillUnmount() {
  //     Firebase.offDbMessages();
  //   }
  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onInputTextChanged={(text) =>
          this.setState({
            text: text,
          })
        }
        onSend={() => this.isSend()}
        user={this.state.senderId}
      />
    );
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
            }}>
            {this.state.name}
          </Text>
        </View>
        <View style={{flex: 1}}>{chat}</View>
      </SafeAreaView>
    );
  }
}

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
    Firebase.getMessages(
      ((message, this.state.senderId, this.state.reciverId) = () =>
        this.setState((previous) => ({
          messages: GiftedChat.append(previous.messages, message),
        }))),
    );
  }

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
  componentWillUnmount() {
    Firebase.offDbMessages();
  }
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

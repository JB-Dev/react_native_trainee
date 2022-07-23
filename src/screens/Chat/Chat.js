import React, {Component} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import io from 'socket.io-client';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.179.38:3000');
    this.socket.on('chat message', (msg) => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage) => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={{height: 40, borderWidth: 2}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({chatMessage});
          }}
        />
        {chatMessages}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

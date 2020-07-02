import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {ListItem} from 'native-base';
import {timing} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';

var data = [];
export default class FirebaseChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      userList: [
        {
          name: 'Jaimin Bhut',
          email: 'jaiminbhut35@gmail.com',
          uid: 'UcPt0oNoNNhkP0rHEBMpTp5T8Xf1',
        },
        {
          name: 'Jaimin Patel',
          email: 'jaiminPatel@gmail.com',
          uid: '6eSWmcV7N5NDMvXkLAGJOaNdNTx2',
        },
      ],
      loading: false,
    };
    this.isMakeArray();
  }

  isMakeArray() {
    var returnArray = [];
    database()
      .ref('/users')
      .once('value', function (snapshot) {
        snapshot.forEach(function (snap) {
          var item = snap.val();
          item.key = snap.key;
          returnArray.push(item);
        });
        console.log('user', returnArray);
      });
  }
  gotoChatScreen = (uid, name) => {
    this.props.navigation.navigate('ChatScreen', {uid: uid, reciverName: name});
  };
  renderItem = (data) => (
    <TouchableOpacity
      onPress={() => this.gotoChatScreen(data.item.uid, data.item.name)}>
      <Text>{data.item.name}</Text>
      <Text>{data.item.email}</Text>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      );
    }
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.header}>{this.state.stores}</Text>
        </View>
        <View>
          <FlatList
            data={this.state.userList}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.key}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

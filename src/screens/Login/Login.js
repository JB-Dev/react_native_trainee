import React, {Component} from 'react';
import {View, Text, Root} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Details from '../details/details';
import {Alert} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  topView() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text style={{backgroundColor: '#000', height: 100, color: '#fff'}}>
          Topview!
        </Text>
      </TouchableOpacity>
    );
  }

  bottomView() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text style={{backgroundColor: 'red', height: 100, color: '#fff'}}>
          BottomView!
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        {this.state.visible ? (
          <View>{this.topView()}</View>
        ) : (
          <View>{this.bottomView()}</View>
        )}
        <TouchableOpacity
          onPress={() =>
            this.setState({
              visible: false,
            })
          }>
          <Text style={{alignSelf: 'center', marginTop: 100}}>Click Me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

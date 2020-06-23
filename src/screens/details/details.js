import React, {Component} from 'react';
import {View, Text, Root} from 'native-base';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import {Alert, Animated} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Details extends Component {
  zoomOut = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      isTopVisible: false,
      isBottomVisible: false,
      animation: 'fadeInDown',
    };
  }

  topView() {
    return (
      <Animatable.View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isTopVisible: this.state.isTopVisible ? false : true,
            });
          }}>
          <Text style={{alignSelf: 'center'}}>Topview!</Text>
        </TouchableOpacity>
        {this.state.isTopVisible ? (
          <Animatable.View animation={this.state.animation}>
            <TextInput
              placeholder={'Enter Value'}
              style={{height: 40, fontSize: 20}}></TextInput>
          </Animatable.View>
        ) : null}
      </Animatable.View>
    );
  }

  bottomView() {
    return (
      <Animatable.View animation={this.state.animation} duration={1000}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isBottomVisible: this.state.isBottomVisible ? false : true,
            });
          }}>
          <Text style={{alignSelf: 'center'}}>BottomView!</Text>
        </TouchableOpacity>
        {this.state.isBottomVisible ? (
          <Animatable.View animation={this.state.animation}>
            <TextInput
              placeholder={'Enter Value'}
              style={{height: 40, fontSize: 20}}></TextInput>
          </Animatable.View>
        ) : null}
      </Animatable.View>
    );
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        {/* {this.state.isTopVisible ? ( */}
        <View>{this.topView()}</View>
        {/* ) : ( */}
        {!this.state.isTopVisible ? <View>{this.bottomView()}</View> : null}
        {this.state.isTopVisible ? <View>{this.bottomView()}</View> : null}
        {/* )} */}
        {/* <TouchableOpacity
          onPress={() =>
            this.setState({
              visible: this.state.visible ? false : true,
            })
          }>
          <Text style={{alignSelf: 'center', marginTop: 100}}>Click Me!</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

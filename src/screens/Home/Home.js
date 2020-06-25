import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {logout} from '../../utils/helper';
import {Root} from 'native-base';

class Home extends Component {
  render() {
    return (
      <Root>
        <SafeAreaView>
          <TouchableOpacity onPress={() => logout(this.props)}>
            <Text>{this.props.token}</Text>
            <Text>{this.props.isLoggedIn}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Root>
    );
  }
}
function mapStateToProps(state) {
  const {tokenReducer} = state;
  const {loginReducer} = state;

  return {
    token: tokenReducer,
    isLoggedIn: loginReducer,
  };
}
export default connect(mapStateToProps)(Home);

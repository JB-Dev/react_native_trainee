import React, {Component} from 'react';
import {View, Text, Root} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../utils/helper';

class Home extends Component {
  constructor(props) {
    super(props);
  }

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

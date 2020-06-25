import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import baseStyle from '../../config/baseStyle';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-community/async-storage';
import keys from '../../config/keys';
import {connect, Provider} from 'react-redux';
import {setToken} from '../../store/action/setToken';
import {setLoginState} from '../../store/action/setLoginState';
import {StackActions} from '@react-navigation/native';
import {Root} from 'native-base';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUserData();
  }

  getUserData = async () => {
    await AsyncStorage.getItem(keys.accessToken).then((token) => {
      if (token !== null) {
        this.props.dispatch(setToken(token));
        this.props.dispatch(setLoginState('true'));
        console.log(token);
        this.props.navigation.dispatch(StackActions.replace('Home'));
      } else {
        this.props.dispatch(setToken(''));
        this.props.dispatch(setLoginState('false'));
        this.props.navigation.dispatch(StackActions.replace('Login'));
      }
    });
  };

  render() {
    return (
      <Root>
        <ActivityIndicator
          color={colors.colorAccent}
          size="large"
          style={{...baseStyle.container}}
        />
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
export default connect(mapStateToProps)(Loading);

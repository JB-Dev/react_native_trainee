import constants from '../../config/constants';

const LoginReducer = (isLoggedIn = 'false', action) => {
  switch (action.type) {
    case constants.SET_LOGIN:
      isLoggedIn = action.isLoggedIn;
      return isLoggedIn;
  }
  return isLoggedIn;
};

export default LoginReducer;

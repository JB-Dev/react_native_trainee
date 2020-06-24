import constants from '../../config/constants';

export const setLoginState = (isLoggedIn) => ({
  type: constants.SET_LOGIN,
  isLoggedIn,
});

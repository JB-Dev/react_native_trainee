import constants from '../../config/constants';

const TokenReducer = (token = '', action) => {
  switch (action.type) {
    case constants.SET_TOKEN:
      token = action.token;
      return token;
  }
  return token;
};
export default TokenReducer;

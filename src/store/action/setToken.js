import constants from '../../config/constants';

export const setToken = (token) => ({
  type: constants.SET_TOKEN,
  token,
});

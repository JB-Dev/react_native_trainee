import {createStore, combineReducers} from 'redux';
import loginReducer from './redux/loginReducer';

const store = createStore(
  combineReducers({
    loginReducer,
  }),
);
export default store;

import {createStore, combineReducers} from 'redux';
import loginReducer from './redux/loginReducer';
import tokenReducer from './redux/tokenReducer';

const store = createStore(
  combineReducers({
    loginReducer,
    tokenReducer,
  }),
);
export default store;

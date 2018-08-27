// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import accounts from './accounts';

const rootReducer = combineReducers({
  accounts,
  router
});

export default rootReducer;

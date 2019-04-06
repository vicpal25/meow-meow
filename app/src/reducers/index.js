import { combineReducers } from 'redux';
import authReducer from './auth';
import catsReducer from './cats'

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  cats: catsReducer,
  form: formReducer
});

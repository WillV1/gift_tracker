import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import recipient from './recipient';

export default combineReducers({
  alert,
  auth,
  recipient
})
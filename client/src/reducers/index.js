import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import recipient from './recipient';

export default combineReducers({
  alert,
  auth,
  profile,
  recipient
})
import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import alert from './alert';
import auth from './auth';
import recipient from './recipient';

export default combineReducers({
  alert,
  auth,
  form: formReducer,
  recipient
})
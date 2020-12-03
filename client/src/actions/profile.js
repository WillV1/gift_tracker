import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
} from './types';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {

    const res = await axios.get('http://localhost:3001/profile/user');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

//Create profile
export const createProfile = (formData)  => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }

    }

      const response = await axios.post('http://localhost:3001/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });

      dispatch(setAlert('Profile created', 'success'));
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}
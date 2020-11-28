import axios from 'axios';
import { setAlert } from './alert';
import { GET_RECIPIENTS, RECIPIENT_ERROR } from './types';

//get recipients
export const getRecipients = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:3001/recipients');

    dispatch({
      type: GET_RECIPIENTS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: RECIPIENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}
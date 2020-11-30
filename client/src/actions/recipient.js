import axios from 'axios';
import { setAlert } from './alert';
import { GET_RECIPIENTS, RECIPIENT_ERROR, DELETE_RECIPIENT, 
  ADD_RECIPIENT, GET_RECIPIENT } from './types';

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

//delete recipient
export const deleteRecipient = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:3001/recipients/${id}`);

    dispatch({
      type: DELETE_RECIPIENT,
      payload: id
    })

    dispatch(setAlert('Recipient Removed', 'success'));

  } catch (err) {
    dispatch({
      type: RECIPIENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

//add recipient
export const addRecipient = formData => async dispatch => {


  // const config = {
  //   headers: { 
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
  
  try {
    const response = await axios.post(`http://localhost:3001/recipients/`, formData);

    dispatch({
      type: ADD_RECIPIENT,
      payload: response.data
    })
    console.log(response.data);
    dispatch(setAlert('Recipient Added', 'success'));

  } catch (err) {
    dispatch({
      type: RECIPIENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

//get recipient
export const getRecipient = id => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:3001/recipients/${id}`);

    dispatch({
      type: GET_RECIPIENT,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: RECIPIENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}
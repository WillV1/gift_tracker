import {
  GET_RECIPIENTS,
  RECIPIENT_ERROR,
  DELETE_RECIPIENT
} from '../actions/types';


const initialState = {
  recipients: [],
  recipient: null,
  loading: true,
  error: {}
}

export default function recipients(state = initialState, action) {

  const {type, payload} = action;

  switch(type) {
    case GET_RECIPIENTS:
      return {
        ...state,
        recipients: payload,
        loading: false
      };
    case DELETE_RECIPIENT:
      return {
        ...state,
        recipients: state.recipients.filter(recipient => recipient._id !== payload),
        loading: false
      }
    case RECIPIENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default: 
      return state;
  }
} 
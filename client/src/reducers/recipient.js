import {
  GET_RECIPIENTS,
  RECIPIENT_ERROR,
  DELETE_RECIPIENT,
  ADD_RECIPIENT,
  EDIT_RECIPIENT,
  GET_RECIPIENT,
  ADD_GIFT,
  REMOVE_GIFT
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
    case GET_RECIPIENT:
      return {
        ...state,
        recipient: payload,
        loading: false
      }
    case ADD_RECIPIENT:
      return {
        ...state,
        recipients: [...state.recipients, payload],
        loading: false
      }

    case EDIT_RECIPIENT: 
      return {
        ...state,
        recipients: state.recipients.map(recipient => recipient._id === payload._id ? 
          recipient = payload : recipient)
      }
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
      }
    case ADD_GIFT:
      return {
        ...state,
        recipient: {...state.recipient, gifts: payload},
        loading: false
      }
    case REMOVE_GIFT:
      return {
        ...state,
        recipient: {
          ...state.recipient,
          gifts: state.recipient.gifts.filter(gift => gift._id !== payload),
          loading: false 
        }
      }
    default: 
      return state;
  }
} 
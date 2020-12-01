import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeGift } from '../actions/recipient';
import { editGift } from '../actions/recipient';

const GiftCard = ({recipientId, gift: { _id, name, price, quantity, purchased}, 
  auth, removeGift, editGift}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s2">
          {name}
        </div>
        <div className="col s2">
          {price}
        </div>
        <div className="col s2">
          {quantity}
        </div>
        <div className="col s2">
          {purchased === true ? <span>Yes</span> : <span>No</span>}
        </div>
        <div className="col s4">
          <Link 
          to={{ pathname:`/recipient/${_id}/gift`, state: {recipient: recipientId}}}
          onClick={e => editGift(recipientId, _id)}
          className="waves-effect waves-light btn-small">Edit</Link>
          <button onClick={e => removeGift(recipientId, _id)}
            className="waves-effect waves-light red btn-small">Delete</button>
        </div>
      </div>
    </div>
  )
}

GiftCard.propTypes = {
  recipientId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  gift: PropTypes.object.isRequired,
  removeGift: PropTypes.func.isRequired,
  editGift: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {editGift, removeGift})(GiftCard);
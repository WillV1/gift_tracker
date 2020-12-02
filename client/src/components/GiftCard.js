import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeGift } from '../actions/recipient';

const GiftCard = ({recipientId, gift: { _id, name, price, recipient, quantity, purchased}, 
  auth, removeGift}) => {
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
          {purchased === true ? <h6>Yes</h6> : <h6>No</h6>}
        </div>
        <div className="col s4">
          <button className="waves-effect waves-light btn-small">Edit</button>
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
  removeGift: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {removeGift})(GiftCard);
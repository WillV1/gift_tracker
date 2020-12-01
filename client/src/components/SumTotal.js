import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeGift } from '../actions/recipient';

const SumTotal = ({recipientId, gift: { _id, name, price, recipient, quantity, purchased}, 
  auth, removeGift}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s7">
          <h5>Actual: <span>${price}</span></h5>
        </div>  
        <div className="col s6">
        </div>
      </div>
    </div>
  )
}

SumTotal.propTypes = {
  recipientId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  gift: PropTypes.object.isRequired,
  removeGift: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {removeGift})(SumTotal);
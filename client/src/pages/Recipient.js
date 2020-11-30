import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRecipient } from '../actions/recipient';

const Recipient = ({ getRecipient, recipient: { recipient, loading}, match }) => {

  useEffect(() => {
    getRecipient(match.params.id);
  }, [getRecipient]);

  return (
    <div>
      <h1>post</h1>
    </div>
  )
}

Recipient.propTypes = {
  getRecipient: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipient: state.recipient
});

export default connect(mapStateToProps, {getRecipient}) (Recipient);
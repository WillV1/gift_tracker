import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRecipient } from '../actions/recipient';
import RecipientCard from '../components/RecipientCard';
import GiftCard from '../components/GiftCard';

const Recipient = ({ getRecipient, recipient: { recipient, loading}, match }) => {

  useEffect(() => {
    getRecipient(match.params.id);
  }, [getRecipient]);

  return loading || recipient === null ? <Spinner /> : <Fragment>
    <RecipientCard recipient={recipient} recipientId={recipient._id} />
    {recipient.gifts.map(gift => {
      return <GiftCard key={gift._id} gift={gift} recipientId={recipient._id}/>
    })}
  </Fragment>
}

Recipient.propTypes = {
  getRecipient: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipient: state.recipient
});

export default connect(mapStateToProps, {getRecipient}) (Recipient);
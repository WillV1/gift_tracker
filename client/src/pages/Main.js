import {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import Spinner from '../layout/Spinner';
import RecipientItem from '../components/RecipientItem';


const Main = ({ getRecipients, recipient: { recipients, loading} }) => {

  useEffect(() => {
    getRecipients();
  }, [getRecipients])
  return loading ? <Spinner /> : <Fragment>
  <h2>Recipient</h2>
  <p>Recipient Name</p>
  {recipients.map(recipient => (
    <RecipientItem key={recipient._id} recipient={recipient}/>
  ))}
  </Fragment>
};

Main.propTypes = {
  getRecipient: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipient: state.recipient
})

export default connect(mapStateToProps, {getRecipients})(Main);
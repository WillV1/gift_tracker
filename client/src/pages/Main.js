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
  <div className="container">
    <div className="row">
      <div className="col s3">
        <h2>Recipient</h2>
        {recipients.map(recipient => (
        <RecipientItem key={recipient._id} recipient={recipient}/>
        ))}
      </div>
      <div className="col s2">
      </div>
      <div className="col s3">
        <h2>Status</h2>
      </div>
      <div className="col s2">
      </div>
      <div className="col s2">
      </div>
    </div>
  </div>
  
  </Fragment>
};

Main.propTypes = {
  getRecipients: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipient: state.recipient
})

export default connect(mapStateToProps, {getRecipients})(Main);
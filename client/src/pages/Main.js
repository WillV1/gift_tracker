import {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import { register } from '../actions/auth';
import Spinner from '../layout/Spinner';
import RecipientItem from '../components/RecipientItem';


const Main = ({ register, getRecipients, auth: {user}, recipient: { recipients, loading} }) => {

  console.log(user)

  useEffect(() => {
    getRecipients();
  }, [getRecipients])
  return loading ? <Spinner /> : <Fragment>
  <div className="container">
    <div className="row">
      <div className="col s10 offset-s1">
        <h4>Welcome {user.name} !</h4>
      </div>
    </div>
    <div className="row">
      <div className="col s3">
        <h3>Recipient</h3>
        {recipients.map(recipient => (
        <RecipientItem key={recipient._id} recipient={recipient}/>
        ))}
      </div>
      <div className="col s2">
      </div>
      <div className="col s3">
        <h3>Status</h3>
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
  recipient: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipient: state.recipient
})

export default connect(mapStateToProps, {register, getRecipients})(Main);
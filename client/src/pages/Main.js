import {Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import { register } from '../actions/auth';
import { getCurrentProfile } from '../actions/profile';
import Spinner from '../layout/Spinner';
import RecipientItem from '../components/RecipientItem';


const Main = ({ register, getCurrentProfile, getRecipients, auth: {user}, 
  recipient: { recipients, loading}, profile: {profile} }) => {

    // const userId = recipients.map(recipient => recipient.user);

    let userId;

    for(let i = 0; i < recipients.length; i++){
      userId = recipients[i].user
    }

  useEffect(() => {
    getRecipients();
    getCurrentProfile();
  }, [getCurrentProfile, getRecipients])

  return loading ? <Spinner /> : <Fragment>
  <div className="container">
    <div className="row">
      <div className="col s10 offset-s1">
        <h4>Welcome {!loading && user.name} !</h4>
      </div>
    </div>
    
    <div className="row">
      <div className="col s3">
        <h3>Recipient</h3>
        { user._id === userId &&
        <div>
          {recipients.map(recipient => (
          <RecipientItem key={recipient._id} recipient={recipient}/>
          ))}
        </div>
        }
      </div>
      <div className="col s2">
      </div>
      <div className="col s2">
      </div>
      <div className="col s2">
      </div>
    </div>

      {profile === null ? (<Fragment>
        <p>Please create a profile</p>
        <Link to='/create-profile' className="waves-effect waves-light btn-small">
        Create Profile</Link>
      </Fragment>) : null}
  </div>
  
  </Fragment>
};

Main.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getRecipients: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  recipient: state.recipient
})

export default connect(mapStateToProps, {getCurrentProfile, register, getRecipients})(Main);
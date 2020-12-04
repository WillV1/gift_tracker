import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { createProfile } from '../actions/profile';

const CreateProfile = ({createProfile}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })

  const { username, email } = formData;
  const history = useHistory();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async e => {
    e.preventDefault();

    createProfile({username, email})

    setFormData({
      username: '',
      email: '',
    });

    history.goBack();
  };

  return (
    <div>
      <h3 className="center-align">Create Profile</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)}>
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input name="username" id="username" type="text" value={username} 
        onChange={e => onChange(e)} 
        className="validate"/>
        <label htmlFor="username">Username</label>
      </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="email" id="email" type="email" value={email} 
          onChange={e => onChange(e)} 
          className="validate"/>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">
        Create Profile
        </button>
      </div>
    </form>
  </div>
    </div>
  )

}

CreateProfile.propTypes = {
createProfile: PropTypes.func.isRequired
}

export default connect(null, {createProfile })(CreateProfile);
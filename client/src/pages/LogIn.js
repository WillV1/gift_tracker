import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const LogIn = ({login, isAuthenticated}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const { email, password } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    login(email, password)

    setState({
      email: '',
      password: '',
    });
    
  };

  //redirect if logged in
  if(isAuthenticated) {
    return <Redirect to="/main" />
  }

  return (
    <div>
      <h3 className="center-align">Log In</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)}>
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input name="email" id="email" type="email" value={email} 
        onChange={e => onChange(e)} 
        className="validate"/>
        <label htmlFor="email">Email</label>
      </div>
    </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password" id="password" type="password" value={password} 
          onChange={e => onChange(e)} 
          className="validate"/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">Log In
        </button>
      </div>
    </form>
    </div>

    <p className="center-align">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

LogIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LogIn);
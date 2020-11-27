import React, {useState} from 'react';

const SignUp = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2 ) {
      console.log('Passwords do not match')
    } else {
      console.log('SUCCESS');
    }
  };

  return (
    <div>
      <h3 className="center-align">Sign Up</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)}>
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input name="name" id="name" type="text" value={name} 
        onChange={e => onChange(e)} 
        className="validate" required/>
        <label htmlFor="name">Name</label>
      </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="email" id="email" type="email" value={email} 
          onChange={e => onChange(e)} 
          className="validate" required/>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password" id="password" type="password" value={password} 
          onChange={e => onChange(e)} 
          className="validate" required/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password2" id="password" type="password" value={password2} 
          onChange={e => onChange(e)} 
          className="validate" required/>
          <label htmlFor="password">Confirm Password</label>
        </div>
      </div>
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}

export default SignUp;
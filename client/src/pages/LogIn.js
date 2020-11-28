import React, {useState} from 'react';

const LogIn = () => {
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
    console.log('SUCCESS');

    setState({
      email: '',
      password: '',
    });
    
  };

  return (
    <div>
      <h3 className="center-align">Log In</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)}>
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
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">Log In
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}

export default LogIn;
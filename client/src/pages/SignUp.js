import React, {useState} from 'react';

const AddRecipent = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const { email, password, password2 } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });

  }

  return (
    <div>
      <h1 className="center-align">Sign Up</h1>
      <div className="row">
    <form className="col s6">
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input name="email" id="email" type="email" value={email} 
        onChange={e => onChange(e)} 
        className="validate" />
        <label for="email">Email</label>
      </div>
    </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password" id="password" type="password" value={password} 
          onChange={e => onChange(e)} 
          className="validate" />
          <label for="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password2" id="password" type="password" class={password2} 
          onChange={e => onChange(e)} 
          className="validate" />
          <label for="password">Confirm Password</label>
        </div>
      </div>
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}

export default AddRecipent;
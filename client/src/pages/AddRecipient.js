import React, {useState} from 'react';

const AddRecipent = () => {

    const [state, setState] = useState({
      name: '',
      relationship: '',
      budget: '',
    })

    const { name, relationship, budget } = state;

    const onChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    }

    const onSubmit = async e => {
      e.preventDefault();
      
      console.log(state);
      
    };

  return (
    <div>
      <h3 className="center-align">Add Recipient</h3>
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
          <input name="relationship" id="relationship" type="text" value={relationship}
          onChange={e => onChange(e)} 
          className="validate" required/>
          <label htmlFor="relationship">Relationship</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="budget" id="budget" type="number" value={budget}
          onChange={e => onChange(e)}
          className="validate" required/>
          <label htmlFor="budget">Budget</label>
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
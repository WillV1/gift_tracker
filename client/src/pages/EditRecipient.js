import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editRecipient } from '../actions/recipient';

const EditRecipient = ({editRecipient, recipient: { recipient, loading}, match }) => {

    const [name, setName] = useState('')
    const [relationship, setRelationship] = useState('')
    const [budget, setBudget] = useState('')

    const onSubmit = async e => {
      e.preventDefault();

      editRecipient({ name, relationship, budget});
      
      setName('')
      setRelationship('')
      setBudget('')
    };

  return (
    <div>
      <h3 className="center-align">Edit Recipient</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)} method="post" encType="multipart/form-data">
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input id="name" type="text" value={name}
        onChange={e => setName(e.target.value)}
        className="validate" required/>
        <label htmlFor="name">Name</label>
      </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input id="relationship" type="text" value={relationship}
          onChange={e => setRelationship(e.target.value)} 
          className="validate" required/>
          <label htmlFor="relationship">Relationship</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input id="budget" type="number" value={budget}
          onChange={e => setBudget(e.target.value)}
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

EditRecipient.propTypes = {
editRecipient: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipient: state.recipient
});

export default connect(mapStateToProps, {editRecipient})(EditRecipient);
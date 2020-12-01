import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { addRecipient } from '../actions/recipient';
import { Field, reduxForm } from 'redux-form';


const AddRecipient = ({handleSubmit}) => {

    // const [name, setName] = useState('')
    // const [relationship, setRelationship] = useState('')
    // const [budget, setBudget] = useState('')
    // const [image, setImage] = useState('')

    const validate = values => {
      const errors = {}
      if (!values.name) {
        errors.name = 'Required'
      }
      if (!values.relationship) {
        errors.name = 'Required'
      }
      if (!values.budget) {
        errors.name = 'Required'
      }
      return errors
    }

    const onSubmit = async e => {
      e.preventDefault();

      // addRecipient({name, relationship, budget, image});
      
      setName('')
      setRelationship('')
      setBudget('')
      setImage('')
    };

  return (
    <div>
      <h3 className="center-align">Add Recipient</h3>
      <div className="row">
    <form className="col s6" 
      onSubmit={handleSubmit}
      // onSubmit={e => onSubmit(e)} 
      method="post" encType="multipart/form-data">
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <Field id="name" type="text" 
        // value={name}
        // onChange={e => setName(e.target.value)}
        name="name"
        component="input"
        className="validate" required/>
        <label htmlFor="name">Name</label>
      </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <Field id="relationship" type="text" 
          // value={relationship}
          // onChange={e => setRelationship(e.target.value)} 
          name="relationship"
          component="input"
          className="validate" required/>
          <label htmlFor="relationship">Relationship</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <Field id="budget" type="number" 
          // value={budget}
          // onChange={e => setBudget(e.target.value)}
          name="budget"
          component="input"
          className="validate" required/>
          <label htmlFor="budget">Budget</label>
        </div>
      </div>
      <div className="row">
        <div className="file-field input-field  col s6 offset-s10">
          <div className="btn">
            <span>File</span>
            <Field type="file" 
            // onChange={e => setImage(e.target.files[0])}
            name="image"
            component="input"/>
          </div>
          <div className="file-path-wrapper">
            <Field className="file-path validate" type="text" />
          </div>
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

AddRecipient = reduxForm({
  form: 'recipient',
  destroyOnUnmount: false,
  validate
})(AddRecipient)

export default AddRecipient

// AddRecipient.propTypes = {
// addRecipient: PropTypes.func.isRequired
// }

// export default connect(null, {addRecipient})(AddRecipient);
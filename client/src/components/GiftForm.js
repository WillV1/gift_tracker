import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addGift, getRecipient } from '../actions/recipient';
import M from "materialize-css";

const GiftForm = ({ addGift, getRecipient, recipient: { recipient, loading}, match }) => {

  useEffect(() => {
    getRecipient(match.params.id);
  },[getRecipient])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [purchased, setPurchased] = useState(false)


  useEffect(() => {
    let select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});
    // M.AutoInit();
  });

  const onSubmit = async e => {
    e.preventDefault();

    addGift(recipient._id, {name, price, quantity, purchased});
    
    setName('')
    setPrice('')
    setQuantity('')
    setPurchased('')
  };

  return (
    <div>
    <h3 className="center-align">Add Gift</h3>
    <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)} method="post">
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
        <input id="relationship" type="number" value={price}
        onChange={e => setPrice(e.target.value)} 
        className="validate" required/>
        <label htmlFor="relationship">Price</label>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s6 offset-s10">
        <input id="quantity" type="number" value={quantity}
        onChange={e => setQuantity(e.target.value)}
        className="validate" required/>
        <label htmlFor="quantity">Quantity</label>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s6 offset-s10">
        <select value={purchased} onChange={e => setPurchased(e.target.value)}>
          <option value="" disabled selected>Choose your option</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
    <label>Purchased?</label>
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

  GiftForm.propTypes = {
  addGift: PropTypes.func.isRequired,
  getRecipient: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired
  }

  const mapStateToProps = state => ({
    recipient: state.recipient
  });

  export default connect(mapStateToProps, { addGift, getRecipient}) (GiftForm);
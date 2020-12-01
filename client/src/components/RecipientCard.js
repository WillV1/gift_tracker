import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { deleteRecipient } from '../actions/recipient';
import EditRecipient from '../pages/EditRecipient';

const RecipientCard = ({ deleteRecipient, auth, recipient: { _id, name, relationship, budget, image }}) => {


  return (
    <div>
      <div className="row">
        <div className="col s4">
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <h5>{relationship}</h5>
        </div>
        <div className="col s4">
          <h5>Budget: <span>${budget}</span></h5>
          <Link to={{ pathname:`/edit/${_id}`, state: {recipient: _id}}} className="waves-effect waves-light btn-small">
          Edit Recipient</Link>
          <Link to={'/addgift'} className="waves-effect waves-light btn-small">
          Add Gift</Link>
        </div>
        <div className="col s4">
          {/*<button onClick={e => deleteRecipient(_id)} className="waves-effect waves-light btn-small">
  Delete Recipient</button>*/}
        </div>
      </div>
      <div className="row">
        <div className="col s2">
          <h6>Gift</h6>
        </div>
        <div className="col s2">
          <h6>Price</h6>
        </div>
        <div className="col s2">
          <h6>Quantity</h6>
        </div>
        <div className="col s2">
          <h6>Purchased?</h6>
        </div>
      </div>
      <div className="row">
        <div className="col s2">
          
        </div>
      </div>
    </div>
  )
}

RecipientCard.propTypes = {
  recipient: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,
  // {deleteRecipient}
  )
  (RecipientCard);
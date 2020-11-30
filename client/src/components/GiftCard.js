import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { deleteRecipient } from '../actions/recipient';

const RecipientItem = ({ deleteRecipient, auth, recipient: { name, relationship, budget }}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s4">
          <h3>{name}</h3>
          <h5>{relationship}</h5>
        </div>
        <div className="col s4">
          <h5>Budget: <span>${budget}</span></h5>
          <h5>Actual: <span>$</span></h5>
          <button className="waves-effect waves-light btn-small">Add Gift</button>
        </div>
        <div className="col s4">
          {/*<button onClick={e => deleteRecipient(_id)} className="waves-effect waves-light btn-small">
  Delete Recipient</button>*/}
        </div>
      </div>
      <div className="row">
        <div className="col s4">
          <h3>Gifts:</h3>
        </div>
        <div className="col s4">
          <h3>Purchased?</h3>
        </div>
        <div className="col s4">
          <button className="waves-effect waves-light btn-small">Edit</button>
          <button className="waves-effect waves-light btn-small">Delete</button>
        </div>
      </div>
    </div>
  )
}

RecipientItem.propTypes = {
  recipient: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteRecipient: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,
  // {deleteRecipient}
  )
  (RecipientItem);
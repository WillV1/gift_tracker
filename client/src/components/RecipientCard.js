import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { deleteRecipient } from '../actions/recipient';

const RecipientItem = ({ deleteRecipient, auth, recipient: { _id, name }}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s4">
          <h6>{name}</h6>
        </div>
        <div className="col s4">
        </div>
        <div className="col s4">
          <Link to={`/recipient/${_id}`} className="waves-effect waves-light btn-small">
          View Recipient</Link>
          <button onClick={e => deleteRecipient(_id)} className="waves-effect waves-light btn-small">
          Delete Recipient</button>
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
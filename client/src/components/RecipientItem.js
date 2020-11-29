import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const RecipientItem = ({ auth, recipient: { _id, name }}) => {
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
          <a className="waves-effect waves-light btn-small">Delete Recipient</a>
        </div>
      </div>
    </div>
  )
}

RecipientItem.propTypes = {
  recipient: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(RecipientItem);
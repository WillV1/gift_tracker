import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const RecipientItem = ({ auth, recipient: {  name }}) => {
  return (
    <div>
      <h3>{name}</h3>
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
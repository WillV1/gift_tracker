import {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import Spinner from '../layout/Spinner';
import { PieChart } from 'react-minimal-pie-chart';


const Main = ({ getRecipients, recipient: { recipients, loading} }) => {

  useEffect(() => {
    getRecipients();
  }, [getRecipients])

  // {recipients.map(recipient => (
  //   <RecipientItem key={recipient._id} recipient={recipient}/>
  //   ))}

  return loading ? <Spinner /> : <Fragment>
  <div className="container">
    <div className="row">
      <div className="col s3">
        <h2>Budget to Actual</h2>
      </div>

      <PieChart data={[
        {title: 'Gift Budget'},
        {title: 'Spent to Date'}
      ]}
      />
    </div>
  </div>
  
  </Fragment>
};

Main.propTypes = {
  getRecipients: PropTypes.func.isRequired,
  recipient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipient: state.recipient
})

export default connect(mapStateToProps, {getRecipients})(Main);
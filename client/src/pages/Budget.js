import {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import Spinner from '../layout/Spinner';
import { PieChart } from 'react-minimal-pie-chart';


const Main = ({ getRecipients, recipient: { recipients, loading} }) => {

let recipientBudget;
let amountSpent;

  useEffect(() => {
    getRecipients();
  }, [getRecipients])

  console.log(recipients)
  if(recipients.length) {
recipientBudget  = recipients.map(recipient => recipient)
.reduce((acc, val) => acc + val.budget, 0);

amountSpent = recipients.map(recipient => recipient.gifts.filter(gift => gift.purchased === true)
.reduce((acc, val) => acc + val.price, 0));
}



console.log(recipientBudget);
console.log(amountSpent);

  return loading ? <Spinner /> : <Fragment>
  <div className="container">
    <div className="row">
      <div className="col s10">
        <h2>Budget to Actual</h2>
      </div>

      <PieChart data={[
        {title: 'Gift Budget', value: recipientBudget, color: '#E38627'},
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
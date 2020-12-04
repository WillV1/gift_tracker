import {Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import Spinner from '../layout/Spinner';

const Main = ({ getRecipients, recipient: { recipients, loading} }) => {

  
let recipientBudget;
let amountSpent;
let amountRemaining;

  useEffect(() => {
    getRecipients();
  }, [getRecipients])

  if(recipients.length) {
recipientBudget  = recipients.map(recipient => recipient)
.reduce((acc, val) => acc + val.budget, 0);

amountSpent = recipients.map(recipient => recipient.gifts.filter(gift => gift.purchased === true)
.reduce((acc, val) => acc + val.price, 0))
.reduce((acc2, val2) => acc2 +(val2.price * val2.quantity), 0)
}

amountRemaining = recipientBudget - amountSpent

const data = {
  labels: ['Amount Remaining', 'Amount Spent'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: ['#54e346','#d35d6e'],
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [amountRemaining, amountSpent]
    }
  ]
};

  return loading ? <Spinner /> : <Fragment>
  <div className="container">
    <div className="row">
      <div className="col s10 offset-s2">
        <h2>Budget to Actual</h2>
      </div>
      <div className="col s10 offset-s2">
        <h4>Amount Budgeted: ${recipientBudget}</h4>
      </div>
    </div>
  </div>
  <div className="chart">
  <Doughnut data={data} />
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
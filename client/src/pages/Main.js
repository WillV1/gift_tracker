import {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipients } from '../actions/recipient';
import Spinner from '../layout/Spinner';

const Main = () => {
  return (
    <div>
      <h2>Main</h2>
    </div>
  )
};

Main.propTypes = {};

export default Main;
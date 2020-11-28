import React, {Fragment, useEffect} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import M from "materialize-css";

const NavBar = ({ auth: { isAuthenticated, loading}, logout}) => {

  const authLinks = (
    <Fragment>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
    <li><Link to="/new">Add Recipient</Link></li>
    <li><Link to="/budget">Check Budget</Link></li>
    <li><Link to="/main">Home</Link></li>
    <li><Link onClick={logout} to="/">Log Out</Link></li>
  </ul>

  <ul id="slide-out" className="sidenav">
        <li><Link to="/new">Add Recipient</Link></li>
        <li><Link to="/budget">Check Budget</Link></li>
        <li><Link to="/main">Home</Link></li>
        <li><Link onClick={logout} to="/">Log Out</Link></li>
      </ul>
      <a href="/" data-target="slide-out" className="sidenav-trigger">
      <i className="material-icons">menu</i></a>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
    <li><Link to="/about">About</Link></li>
    <li><Link to="/signup">Sign Up</Link></li>
    <li><Link to="/login">Log In</Link></li>
  </ul>

  <ul id="slide-out" className="sidenav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/login">Log In</Link></li>
    </ul>
    <a href="/" data-target="slide-out" className="sidenav-trigger">
      <i className="material-icons">menu</i></a>
    </Fragment>
  );

  useEffect(() => {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
  });

  return (
    <div>
      <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Gift Tracker</Link>
        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </div>     
      </nav>
    </div>
  )
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
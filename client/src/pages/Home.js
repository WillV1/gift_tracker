import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Gift Tracker</h1>
      <h5>We're glad you're here!</h5>
      <h5>New here? Click to <Link to="/signup">sign up</Link> and join us.</h5>
      <h5>Already have an account? <Link to="/login">Log in</Link> to continue tracking.</h5>
    </div>
  )
}

export default Home;
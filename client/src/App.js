import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

import Budget from './pages/Budget';
import Recipient from './pages/Recipient';
import AddRecipient from './pages/AddRecipient';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NotFoundPage from './pages/NotFound';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
  return (
    <div>
    <Router>
    <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/about" component={About} />
        {/*<Route path="/main" component={Main} />*/}
        <Route path="/budget" component={Budget} />
        <Route path="/new" component={AddRecipient} />
        <Route path="/recipient/:id" component={Recipient} />
        <Route component={NotFoundPage} />
      </Switch>
    <Footer />
    </Router>
    </div>
  );
}

export default App;

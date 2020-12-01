import { useEffect } from 'react';
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
import EditRecipient from './pages/EditRecipient';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Main from './pages/Main';
import GiftForm from './components/GiftForm';
import PrivateRoute from './routing/PrivateRoute';
import NotFoundPage from './pages/NotFound';
import Alert from './components/Alert';
//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  useEffect (() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <div>
    <Router>
    <NavBar />
    <div className="container">
    <Alert />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/about" component={About} />
      <PrivateRoute path="/main" component={Main} />
      <Route path="/budget" component={Budget} />
      <Route path="/new" component={AddRecipient} />
      <Route path="/addgift" component={GiftForm} />
      <PrivateRoute path="/recipient/:id" component={Recipient} />
      <Route path="/edit/:id" component={EditRecipient} />
      <Route component={NotFoundPage} />
    </Switch>
    </div>
    <Footer />
    </Router>
    </div>
    </Provider>
  );
}

export default App;

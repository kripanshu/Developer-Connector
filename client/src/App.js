import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import CreateProfile from './components/create-profile/CreateProfile';
import PrivateRoute from './components/common/PrivateRoute';
import { setCurrentUser, logoutUser} from './action/authAction';
import { clearCurrentProfile} from './action/profileAction';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); 

  const currentTime = Date.now()/ 1000;
  if(decoded.exp < currentTime){
    // logout user 
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = '/login';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
              <Route exact path="/" component={Landing}/>
              <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
              <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>
              </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

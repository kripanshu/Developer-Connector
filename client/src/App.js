import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import { setCurrentUser, logoutUser} from './action/authAction';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

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
    // TODO: clear current profile
    
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
              </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

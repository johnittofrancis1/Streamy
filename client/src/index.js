import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';

import App from './Components/App.js';
import reducers from './reducers';
import './App.css';

function middleware({dispatch, getState})
{   
    return (next) => {
        return (action) => {
            if (typeof action === 'function')
            {
                return action(dispatch, getState);
            }
            return next(action);
        }
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

var decodedAuth = null;
if (getCookie("authToken") !== "")
    decodedAuth = jwtDecode(getCookie("authToken"));

ReactDOM.render(
    <Provider store={createStore(reducers, {auth: decodedAuth}, composeEnhancers(applyMiddleware(middleware)))}>
        <App/> 
    </Provider>,
    document.querySelector("#root")
);

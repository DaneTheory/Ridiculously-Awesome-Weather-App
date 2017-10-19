// Module
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

// import { Router, browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import createLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import RedBox from 'redbox-react'

// File
import Routes from './Routes'
import reducer from './reducers'

import InitialState from './reducers/InitialState'

// Import global stylesheets (as side-effects)
import 'react-toolbox/lib/commons.scss'
import './theme/global.pcss'

// Create array of redux middleware
const middleware = [promiseMiddleware, reduxThunk]


// Only use redux-logger in dev
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    duration: true,
    timestamp: true,
    level: 'info',
    colors: {
      title: () => 'inherit',
      prevState: () => '#9E9E9E',
      action: () => '#03A9F4',
      nextState: () => '#4CAF50',
      error: () => '#F20404',
    },
    stateTransformer: state => state,
    actionTransformer: action => action,
    errorTransformer: error => error,
    logger: console,
    logErrors: true,
    diff: true,
    diffPredicate: undefined,
  })
  middleware.push(logger)
}

const allMiddleware = applyMiddleware(...middleware)

let store = compose(
  allMiddleware,
  autoRehydrate({log: true})
)(createStore)(reducer)

persistStore(store, {whitelist: ['UserFavoritesReducer']})

// Note: this is the element inside of which we'll render the app
const rootDomElement = document.querySelector('.container');

try {
  const provider = (
    <Provider store={ store }>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
  render(provider, rootDomElement);
} catch (err) {
  console.error('Rendering error:', err);
  render(<RedBox error={ err } />, rootDomElement);
}

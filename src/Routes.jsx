/*=================================
              ROUTES
==================================*/

// Deps
import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'

// Route Views
import AppContainer from './containers/AppContainer/AppContainer'
import ErrorPageContainer from './containers/ErrorPageContainer/ErrorPageContainer'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ AppContainer } />
    <Route component={ ErrorPageContainer } />
  </Switch>
)

export default Routes

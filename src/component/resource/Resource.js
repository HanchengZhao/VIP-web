import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ResourcePage from './ResourcePage';
// import { AdvisorRoute, PrivateRoute } from '../Route';

// import userStore from '../../stores/UserStore';

const Resource = ( ) => (
  <div>
    <Switch>
      <Route path={`/resource/:category`} component={ ResourcePage }/>
    </Switch>
  </div>
)

export default Resource;
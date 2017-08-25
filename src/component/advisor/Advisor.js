import React from 'react';

import AdvisorPage from './AdvisorPage';
import EditRoster from './EditRoster';

import {Switch} from 'react-router-dom';
import {AdvisorRoute} from '../Route';


import userStore from '../../stores/UserStore';

const Advisor = ( { match } ) => (
  <div>
    <Switch>
      <AdvisorRoute path={`${match.url}/:teamID`} user = {userStore} component = {EditRoster} />
      <AdvisorRoute path={match.url} user = {userStore} component = {AdvisorPage} />
    </Switch>
  </div>


)

export default Advisor;

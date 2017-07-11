import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProjectPage from './ProjectPage';
import ProjectList from './ProjectList';
import ProjectApplication from './ProjectApplication';
import StudentApplication from './StudentApplication';


const Projects = ( {match} ) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/application`} component={ ProjectApplication }/>
      <Route exact path={`${match.url}/:projectid/apply`} component={ StudentApplication }/>
      <Route path={`${match.url}/:projectId`} component={ ProjectPage }/>
      <Route exact path={match.url} component={ ProjectList }/>
    </Switch>
  </div>
)

export default Projects;
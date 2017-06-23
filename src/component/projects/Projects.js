import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProjectPage from './ProjectPage';
import ProjectList from './ProjectList';
import ASUTeamFormComponent from './Application/ASUTeamFormComponent';


const Projects = ( {match} ) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/application`} component={ ASUTeamFormComponent }/>
      <Route path={`${match.url}/:projectId`} component={ ProjectPage }/>
      <Route exact path={match.url} component={ ProjectList }/>
    </Switch>
  </div>
)

export default Projects;
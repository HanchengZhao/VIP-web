import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ProjectList from './ProjectList';

const Projects = ( {match} ) => (
  <div>
    <Route path={`${match.url}/:projectId`} render={({match}) => (
      <h3>{match.params.projectId}</h3>
    )}/>
    <Route exact path={match.url} component={ ProjectList }/>
  </div>
)

export default Projects;
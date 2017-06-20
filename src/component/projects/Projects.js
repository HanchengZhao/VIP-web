import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ProjectPage from './ProjectPage';
import ProjectList from './ProjectList';


const Projects = ( {match} ) => (
  <div>
    <Route path={`${match.url}/:projectId`} component={ProjectPage}/>
    <Route exact path={match.url} component={ ProjectList }/>
  </div>
)

export default Projects;
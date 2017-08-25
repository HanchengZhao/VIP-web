import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import PeerReviewPage from './PeerReviewPage';
import QuestionContainer from './QuestionContainer';
import { AdvisorRoute, FacultyRoute } from '../Route';
import userStore from '../../stores/UserStore';


const PeerReview = ( {match} ) => (
  <div>
    <Switch>
      {/*<AdvisorRoute exact path={`${match.url}/application`} user={userStore} component={ ASUTeamFormComponent }/>*/}
      <FacultyRoute exact path={`${match.url}/form_generator`} user={userStore} component={ QuestionContainer }/>
      <Route exact path={match.url} component={ PeerReviewPage }/>
    </Switch>
  </div>
)


export default PeerReview;
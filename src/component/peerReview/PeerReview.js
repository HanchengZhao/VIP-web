import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import PeerReviewPage from './PeerReviewPage';
import QuestionContainer from './QuestionContainer';
import { AdvisorRoute, PrivateRoute } from '../Route';
import userStore from '../../stores/UserStore';


const PeerReview = ( {match} ) => (
  <div>
    <Switch>
      {/*<AdvisorRoute exact path={`${match.url}/application`} user={userStore} component={ ASUTeamFormComponent }/>*/}
      <Route exact path={`${match.url}/form_generator`} component={ QuestionContainer }/>
      <Route exact path={match.url} component={ PeerReviewPage }/>
    </Switch>
  </div>
)


export default PeerReview;
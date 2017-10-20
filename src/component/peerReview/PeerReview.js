import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FormList from './FormList';
import PeerReviewPage from './PeerReviewPage';
import QuestionContainer from './QuestionContainer';
import ReviewResult from './reviewResult/ReviewResult';
import { AdvisorRoute, FacultyRoute } from '../Route';
import userStore from '../../stores/UserStore';


const PeerReview = ( {match} ) => (
  <div>
    <Switch>
      {/*<AdvisorRoute exact path={`${match.url}/application`} user={userStore} component={ ASUTeamFormComponent }/>*/}
      <FacultyRoute path={`${match.url}/:team/:formid`} user={userStore} component={ QuestionContainer } />
      <FacultyRoute exact path={`${match.url}/form_list`} user={userStore} component={ FormList }/>
      <FacultyRoute exact path={`${match.url}/form_generator`} user={userStore} component={ QuestionContainer }/>
      <FacultyRoute exact path={`${match.url}/review_result`} user={userStore} component={ReviewResult}/>
      <Route exact path={match.url} component={ PeerReviewPage }/>
    </Switch>
  </div>
)


export default PeerReview;
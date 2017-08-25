import React from 'react';
import {Switch} from 'react-router-dom';
import {StudentRoute} from '../Route';

//components
import StudentPage from './StudentPage';

import userStore from '../../stores/UserStore';

const Student = ({match}) => (
  <div>
    <StudentRoute path = {match.url} user = {userStore} component = {StudentPage}/>
  </div>
)

export default Student;
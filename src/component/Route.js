import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export const AdminRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "admin"
      ? <Component {...props} />
      : <Redirect to='/login'/>}
  />  
)

export const AdvisorRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "advisor"
      ? <Component {...props} />
      : <Redirect to='/login'/>}
  />  
)

export const FacultyRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "admin" || user.role === "advisor"
      ? <Component {...props} />
      : <Redirect to='/login'/>}
  />  
)

export const StudentRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "student"
      ? <Component {...props} />
      : <Redirect to='/login'/>}
  />  
)

export const PrivateRoute = ({component: Component, authed, ...rest}) => (
  <Route {...rest}
    render={(props) => authed === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />
)

export const PublicRoute = ({component: Component, authed, ...rest}) => (
  <Route {...rest}
    render={(props) => authed === false
      ? <Component {...props} />
      : <Redirect to='/' />}
  />
) 


export const UnEnrolledRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "not_found"
      ? <Component {...props} />
      : <Redirect to='/email_sending'/>}
  />  
)

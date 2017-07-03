import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export const PrivateRoute = ({component: Component, authed, ...rest}) => (
  <Route {...rest}
    render={(props) => authed === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />
)

export const AdminRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "admin"

export const AdminRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "admin"
      ? <Component {...props} />
      : <Redirect to='/login'/>}
  />  
)

export const UnAuthRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest}
    render={(props) => user.role === "not_found"

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
import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
import {Consumer} from './Context';



const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Consumer>
            {context => {
                return (
                    <Route 
                        {...rest}
                        render = {(props) => context.activeUser ? (
                        <Component {...props} {...rest} />
                        ) : (
                        <Redirect 
                            to="/signin"/>
                        )}  />
                );
            }}
        </Consumer>
    );
  }

export default PrivateRoute;
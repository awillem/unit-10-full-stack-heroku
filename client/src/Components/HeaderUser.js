import React from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context';

const HeaderUser = () => (
    <Consumer>
        {context => {
            return(
                <nav><span>Welcome {context.user.firstName} {context.user.lastName}</span> <NavLink className="signout" to={"/SignOut"}>Sign Out</NavLink></nav>
            );
        } }
    </Consumer>
)

export default HeaderUser;
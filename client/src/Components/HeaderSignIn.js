import React from 'react';
import {NavLink} from 'react-router-dom';

const HeaderSignIn = () => (
            
    <nav><NavLink className="signup" to={"/SignUp"}>Sign Up</NavLink><NavLink className="signin" to={"/SignIn"}>Sign In</NavLink></nav>
)

export default HeaderSignIn;
import React from 'react';
import {Consumer} from './Context';
import HeaderUser from './HeaderUser';
import HeaderSignIn from './HeaderSignIn';

const Header = () => {
    return (
      
      <Consumer>
        {context => {
          //if there is an active user, display the HeaderUser, else display the SignIn/SignUp options
          let userDisplay;
          if(context.activeUser) {
            userDisplay = <HeaderUser />
          } else {
            userDisplay = <HeaderSignIn />
          }

          return (
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>{userDisplay}</nav>
                {/* <nav><NavLink className="signup" to={"/SignUp"}>Sign Up</NavLink><NavLink className="signin" to={"/SignIn"}>Sign In</NavLink></nav> */}
              </div>
            </div>
          );
        }}
      </Consumer>

    );
}

export default Header;
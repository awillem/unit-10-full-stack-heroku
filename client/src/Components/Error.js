import React from 'react';
import {Link} from 'react-router-dom';

const Error = () => {
    return (
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <div className="grid-100" id="links">
            <Link className="button button-secondary" to="/">Return to List</Link></div>
        </div>
    );
}

export default Error;
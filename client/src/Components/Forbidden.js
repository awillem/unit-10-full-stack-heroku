import React from 'react';
import {Link} from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
            <div className="grid-100" id="links">
            <Link className="button button-secondary" to="/">Return to List</Link></div>
        </div>
    );
}

export default Forbidden;
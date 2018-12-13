import React from 'react';
import {Link} from 'react-router-dom';

const Course = (props) => {
    return (
        <div className="grid-33"><Link to={{
            pathname: `/courses/${props.id}`,
            state: {
                id: props.id
            }
        }} className="course--module course--link">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.title}</h3>
            </Link></div>
    );
}

export default Course;
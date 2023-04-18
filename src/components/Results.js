import { Fragment } from "react";
import React from 'react';
import { Link, ReactDOM } from "react-router-dom";

const Results = () => {
    return(
        <div>
            <h1>Results page</h1>
            <p>display results here</p>
            <Link to='/'>
                <button>Return home</button>
            </Link>
            
        </div>
    )
}
export default Results;
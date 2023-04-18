import { Fragment } from "react";
import React from 'react';
import { Link, ReactDOM } from "react-router-dom";
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
    width: 400,
  }
const Results = () => {
    return(
        <div>
            <h1>You scored</h1>
            <GaugeChart id="gauge-chart1" 
            textColor="black"
            style={chartStyle}
            colors={['#FF0000', '#FFFF00', '#00FF00']}
            />
            <Link to='/'>
                <button>Home</button>
            </Link>
            
        </div>
    )
}
export default Results;
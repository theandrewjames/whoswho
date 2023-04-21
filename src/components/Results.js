import { Fragment } from "react";
import React from 'react';
import { Link, ReactDOM, useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import GaugeChart from 'react-gauge-chart'
import '../css/results.css'

const chartStyle = {
    width: 400,
}
const Results = () => {
    console.log(useLocation().state.choices)
    // console.log("choice1" + useLocation().state.choices[0].artist)
    // console.log("answer1" + useLocation().state.answers[0])
    // console.log("choice2" + useLocation().state.choices[1].artist)
    // console.log("answer2" + useLocation().state.answers[1])
    // console.log("choice3" + useLocation().state.choices[2].artist)
    // console.log("answer3" + useLocation().state.answers[2])
    console.log(useLocation().state.choices[0].artist == useLocation().state.answers[0])
    let score = 0;
    for (let i = 0; i < useLocation().state.numSongs; i++) {
        if (useLocation().state.choices[i].artist == useLocation().state.answers[i]) {
            score = score + 1;
        }
    }
    score = (score / useLocation().state.numSongs);
    return (
        <div>
            <h1 className="text-center">Your score:</h1>
            <div className="d-flex justify-content-center">

                <GaugeChart id="gauge-chart1"
                    textColor="black"
                    percent={score}
                    style={chartStyle}
                    colors={['#FF0000', '#FFFF00', '#00FF00']}
                />
            </div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Song</th>
                        <th>Correct Artist</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {useLocation().state.choices.map((song, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{song.song}</td>
                                <td>{song.artist}</td>
                                <td>{useLocation().state.answers[index]}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center">
                <Link to='/'>
                    <button className="success">Home</button>
                </Link>
            </div>

        </div>
    )
}
export default Results;
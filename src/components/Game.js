import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { Row } from 'react-bootstrap';
import '../css/game.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {


    const [currentSong, setCurrentSong] = useState('');
    const [thisHowl, setThisHowl] = useState({});
    const [droppedDivs, setDroppedDivs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);

    //Randomizes songs from API results and picks first 4 results since 4 is max # of artists
    //and sets them to state.
    if (filteredSongs.length === 0) {
        const newFilteredSongs = songs.sort((a, b) => 0.5 - Math.random()).slice(0, 4);
        setFilteredSongs(newFilteredSongs);
    }

    // localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // localStorage.setItem("noOfSongs", noOfSongs)
    // localStorage.setItem("noOfArtists", noOfArtists)


    const [radioValue, setRadioValue] = useState({});

    useEffect(() => {
        console.log(radioValue);
    }, [radioValue]);


    return (
        <Row className='d-flex justify-content-around'>
            <h3>Game Page</h3>
            <div className='card p-2'>
                {filteredSongs.slice(0, noOfSongs).map((song, index) => (
                    <Row>
                        <div className='col-md-6'>
                            <div className='row d-flex justify-content-around p-1 rounded-3 audio mt-1 mx-auto'>
                                <div className='col-md-8 song-title align-items-center'>
                                    <h4>{song.song}</h4>
                                </div>
                                <div
                                    className='row col-md-4'
                                    draggable
                                    onDragStart={(e) => {
                                        setCurrentSong(song.previewUrl)
                                        //console.log("this is current song", currentSong) not the same song
                                        dragStarted(e, index)
                                    }}
                                // style={{ borderStyle: 'solid', borderColor: 'red' }}
                                >

                                    <div className='col-sm-6'>
                                        <button className='music' onClick={() => {
                                            setCurrentSong(song.previewUrl);
                                            console.log("this is current song", song)
                                            const thisSound = new Howl({
                                                src: [song.previewUrl],
                                                html5: true,
                                                preload: true,
                                            })
                                            setThisHowl(thisSound);
                                            thisSound.play()

                                        }}>
                                            <FontAwesomeIcon style={{ color: 'white' }} key={index} icon={faCirclePlay} />
                                        </button>
                                    </div>

                                    <div className='col-sm-6'>
                                        <button className='music' onClick={() => {
                                            console.log("I was clicked")
                                            Howler.stop()
                                        }}>
                                            <FontAwesomeIcon style={{ color: 'white' }} icon={faCirclePause} />
                                        </button>
                                    </div>
                                    {/* <label>{song.song}</label> */}
                                </div>

                            </div>
                        </div>

                        <div className='col-md-6 mt-1'>

                            <ButtonGroup className='d-flex' id={`bg-${index}`}>
                                {filteredSongs.slice(0, noOfArtists).map((artist, idx) => {
                                    return (
                                        <ToggleButton
                                            key={idx}
                                            id={`${index}${idx}`}
                                            type="radio"
                                            variant={'outline-success'}
                                            name={`radio-${index}`}
                                            value={artist.artist}
                                            checked={radioValue[`${index}`] == artist.artist}
                                            onChange={(e) => {
                                                const newValue = e.currentTarget.value;
                                                setRadioValue(prevState => ({ ...prevState, [`${index}`]: newValue }));
                                                console.log("artist artist " + artist.artist);
                                                console.log("radio value at index " + radioValue[index]);
                                                console.log(Boolean(radioValue[index] == artist.artist))
                                            }}
                                        >
                                            {artist.artist}
                                        </ToggleButton>
                                    )
                                })}
                            </ButtonGroup>
                        </div>

                    </Row>

                ))}
            </div >


            <div className='d-flex justify-content-center mt-5'>
                <Link to={{
                    pathname: "/results", state: {
                        choices: filteredSongs.slice(0, noOfSongs),
                        answers: radioValue, numSongs: noOfSongs, numArtist: noOfArtists
                    }
                }}>
                    <button className='btn btn-primary '>Submit</button>
                </Link>
            </div>


        </Row>
    )
}

export default Game;
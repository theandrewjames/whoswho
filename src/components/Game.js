import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
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
        <div>
            <h3>Game Page</h3>
            {filteredSongs.slice(0, noOfSongs).map((song, index) => (
                <div style={{ width: '50%' }}>
                    <div
                        style={{ borderStyle: 'solid', borderColor: 'red' }}>
                        <button onClick={() => {
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
                            <FontAwesomeIcon key={index} icon={faCirclePlay} />
                        </button>

                        <button onClick={() => {
                            console.log("I was clicked")
                            Howler.stop()
                        }}>
                            <FontAwesomeIcon icon={faCirclePause} />
                        </button>
                        <ButtonGroup id={`bg-${index}`}>
                        {filteredSongs.slice(0, noOfArtists).map((artist, idx) => {
                            return(
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

                </div>

            ))}
            <Link to={{ pathname: "/results", state: {choices: filteredSongs.slice(0, noOfSongs), 
                answers: radioValue, numSongs: noOfSongs, numArtist: noOfArtists}}}>
            <button>Submit</button>
            </Link>
            
            

        </div>
    )
}

export default Game;
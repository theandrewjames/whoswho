import React, { useState } from 'react'
import { Howl, Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {

    const songsArr = songs.map((song) => song.previewUrl);
    const [ thisHowl, setThisHowl ] = useState({})
    console.log("this is songs", songs);
    console.log(selectedGenre)
    console.log(noOfSongs)
    console.log(noOfArtists)

    // localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // localStorage.setItem("noOfSongs", noOfSongs)
    // localStorage.setItem("noOfArtists", noOfArtists)

    
    return (
        <div>
            <h3>Game Page</h3>
            {songsArr.map((song, index) => (
                <div key={index}>
                    <button onClick={() => {
                        const thisSound = new Howl({
                            src: [song],
                            html5: true,
                            preload: true,
                        })
                        setThisHowl(thisSound);
                        thisSound.play()
                    }}>
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </button>

                    <button onClick={() => {
                        console.log("I was clicked")
                        thisHowl.pause()
                    }}>
                        <FontAwesomeIcon icon={faCirclePause} />
                    </button>
                </div>

            ))}

        </div>
    )
}

export default Game;
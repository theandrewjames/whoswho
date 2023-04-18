import React from 'react'
import { Howl, Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons'; 
const Game = ({selectedGenre, noOfSongs, noOfArtists, sounds}) => {
    console.log(selectedGenre)
    console.log(noOfSongs)
    console.log(noOfArtists)

    localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    localStorage.setItem("noOfSongs", noOfSongs)
    localStorage.setItem("noOfArtists", noOfArtists)
    let mySound = 'https://p.scdn.co/mp3-preview/6fc68c105e091645376471727960d2ba3cd0ee01'

    const callMySound = (src) => {
        const sound = new Howl({
            src,
            html5: true,
            preload: true,
        })
        sound.play()
    }

    return(
        <div>
            <h3>Game Page</h3>
            <div>
                <button onClick={() => callMySound(mySound)}>
                    <FontAwesomeIcon icon={faCirclePlay}/>
                </button>

                <button onClick={() => pauseMySound(mySound)}>
                    <FontAwesomeIcon icon={faCirclePause}/>
                </button>
            </div>

        </div>
    )
}

export default Game;
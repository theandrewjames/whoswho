import React, { useState } from 'react'
import { Howl, Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {
    const copyArr = [...songs];

    // const freqCounter = (copyArr) => {
    //     let freqCount = {};
    //     for (let song of copyArr) {
    //         freqCount[song.artist] = freqCount[song.artist] + 1 || 1;
    //     }
    //     return freqCount;
    // }

    // const entries = Object.entries(freqCounter(copyArr)).filter((e) => e[1] > 1)

    // for (let i = 0; i < entries.length; i++) {
    //     for (let k = 0; k < copyArr.length; k++) {
    //         let counter = freqCounter(copyArr)
    //         console.log("this is counter", counter)
    //         for (let count in counter) {
    //             if (counter[count] != 1) {
    //                 if (copyArr[k].artist == entries[i][0]) {
    //                     let idx = copyArr.findIndex((c) => c.artist == copyArr[k].artist)
    //                     copyArr.splice(idx, 1)
    //                 }
    //             } else {
    //                 continue;
    //             }

    //         }
    //     }
    // }

    //console.log("This is copyOf Before: ", copyArr);
    const [thisHowl, setThisHowl] = useState({})
    console.log(selectedGenre)
    console.log(noOfSongs)
    console.log(noOfArtists)

    const randomArr = [];
    let randomSong;
    for (let i =0; i < noOfArtists; i++){
        randomSong = copyArr[Math.floor(copyArr.length * Math.random())];
        let index = copyArr.indexOf(randomSong);
        randomArr.push(randomSong);
        copyArr.splice(index, 1);
    }
    console.log("This is random Arr: ", randomArr);


    // localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // localStorage.setItem("noOfSongs", noOfSongs)
    // localStorage.setItem("noOfArtists", noOfArtists)

    return (
        <div>
            <h3>Game Page</h3>
            {songs.map((song, index) => (
                <>

                    <div>
                        <button onClick={() => {
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
                            thisHowl.pause()
                        }}>
                            <FontAwesomeIcon icon={faCirclePause} />
                        </button>
                    </div>

                    {/* <div>
                        <img src={song.image} alt={`${song.artist} image`}/>
                    </div> */}

                </>

            ))}
            {/* {songsArr.map((song, index) => (
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

            ))} */}

        </div>
    )
}

export default Game;
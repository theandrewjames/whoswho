import React, { useState } from 'react'
import { Howl, Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {

    //console.log(noOfArtists)
    const copyArr = [...songs];
    const [currentSong, setCurrentSong] = useState('');
    const [thisHowl, setThisHowl] = useState({});
    const [droppedDivs, setDroppedDivs] = useState([{
        divId: null,
        song: ''
    }]);

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

    const randomSongs = [];
    let randomSong;
    for (let i = 0; i < noOfArtists; i++) {
        randomSong = copyArr[Math.floor(copyArr.length * Math.random())];
        let index = copyArr.indexOf(randomSong);
        randomSongs.push(randomSong);
        copyArr.splice(index, 1);
    }

    const randomImgs = [];
    const copyOfRandomSongs = [...randomSongs]
    let randomImg;
    for (let i = 0; i < copyOfRandomSongs.length; i++) {
        randomImg = copyOfRandomSongs[Math.floor(copyOfRandomSongs.length * Math.random())];
        // let index = copyArr.indexOf(randomImg);
        // copyOfRandomSongs.splice(index, 1);
        //randomImgs.push(randomImg.image);
        randomImgs.push(randomImg);
    }

    // console.log("This is random songs: ", randomSongs);
    // console.log("This is random imgs: ", randomImgs);

    const dragStarted = (e, index) => {
        console.log(`drag has started for index: ${index}`)
        e.dataTransfer.setData('song-index', index)
    }

    const dragOver = (e) => {
        e.preventDefault();

        console.log('dragging over now')
    }

    const dragDropped = (e) => {
        console.log('div is dropped')
        let transferedDiv = e.dataTransfer.getData('song-index')

        // let div = {
        //     divId: transferedDiv,
        //     song: currentSong
        // }

        setDroppedDivs([...droppedDivs, {
            divId: transferedDiv,
            song: currentSong
        }])
        console.log(currentSong)
        console.log(transferedDiv)
        console.log(droppedDivs)
    }

    // localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // localStorage.setItem("noOfSongs", noOfSongs)
    // localStorage.setItem("noOfArtists", noOfArtists)


    return (
        <div>
            <h3>Game Page</h3>
            {randomSongs.map((song, index) => (
                <div style={{ width: '400px' }}>
                    <div
                        draggable
                        onDragStart={(e) => {
                            setCurrentSong(song)
                            dragStarted(e, index)
                        }}
                        style={{ borderStyle: 'solid', borderColor: 'red' }}>
                        <button onClick={() => {
                            setCurrentSong(song);
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

                </div>

            ))}

            <div>
                <h3>Artists</h3>
                <div
                    droppable='true'
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => dragDropped(e)}
                    style={{ height: '800px', width: '400px', borderStyle: 'solid', borderColor: 'black' }}>


                    {/* {droppedDivs.map((div, i) => {

                    } )} */}
                </div>
            </div>

            {/* {songs.map((song, index) => (
                <div style={{width: '400px'}}>

                    <div 
                    draggable 
                    onDragStart={(e) => dragStarted(e, index)}
                    style={{ borderStyle: 'solid', borderColor: 'red'}}>
                        <button onClick={() => {
                            setCurrentSong(song);
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


                    <div>
                        <img src={song.image} alt={`${song.artist} image`}/>
                    </div>

                 </div>

                

            ))} */}

        </div>
    )
}

export default Game;
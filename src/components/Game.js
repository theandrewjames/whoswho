import React, { useState, useEffect } from 'react'
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {

    const copyArr = [...songs];
    const [currentSong, setCurrentSong] = useState('');
    const [thisHowl, setThisHowl] = useState({});
    const [droppedDivs, setDroppedDivs] = useState([]);

    const randomSongs = [];
    let randomSong;
    for (let i = 0; i < noOfArtists; i++) {
        randomSong = copyArr[Math.floor(copyArr.length * Math.random())];
        let index = copyArr.indexOf(randomSong);
        randomSongs.push(randomSong);
        copyArr.splice(index, 1);
    }
    //console.log("This is random songs: ", randomSongs);

    // const randomImgs = randomSongs.map((s) => s.image)
    // const randomImgs = [];
    // const copyOfRandomSongs = [...randomSongs]
    // let randomImg;
    // for (let i = 0; i < copyOfRandomSongs.length; i++) {
    //     randomImg = copyOfRandomSongs[Math.floor(copyOfRandomSongs.length * Math.random())];
    //     // let index = copyArr.indexOf(randomImg);
    //     // copyOfRandomSongs.splice(index, 1);
    //     //randomImgs.push(randomImg.image);
    //     randomImgs.push(randomImg);
    // }
    //console.log("This is random imgs: ", randomImgs);


    const dragStarted = (e, index) => {
        console.log(`drag has started for index: ${index}`)
        e.dataTransfer.setData('song-index', index)
    }

    const dragOver = (e) => {
        e.preventDefault();
        console.log('dragging over now')
    }

    const dragDropped = (e) => {
        e.preventDefault()
        console.log('div is dropped')
        let transferedDiv = e.dataTransfer.getData('song-index')
        setDroppedDivs([...droppedDivs, { divId: transferedDiv, song: currentSong.previewUrl, data: currentSong }])
    }

    useEffect(() => {
        console.log(droppedDivs);
    }, [droppedDivs]);

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

                </div>

            ))}

            <div>
                <h3>Artists</h3>
                <div
                    droppable='true'
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => dragDropped(e)}
                    style={{ height: '800px', width: '400px', borderStyle: 'solid', borderColor: 'black' }}>
                    {/* {randomSongs.map((song, idx) => {
                        return (<div>
                            <img src={`${song.image}`} alt={`${song.artist} image`} />
                        </div>)
                    })} */}

                    {droppedDivs.map((div, index) => {
                        return (
                            <div>
                                {div.song}
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Game;
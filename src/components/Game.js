import React, { useState, useEffect } from 'react'
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import '../css/game.css'
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {


    const [currentSong, setCurrentSong] = useState('');
    const [thisHowl, setThisHowl] = useState({});
    const [droppedDivs, setDroppedDivs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);

    if (filteredSongs.length === 0) {
        const newFilteredSongs = songs.sort((a, b) => 0.5 - Math.random()).slice(0, 4);
        setFilteredSongs(newFilteredSongs);
    }

    console.log("This is filtered Songs", filteredSongs)

    // const randomSongs = [];
    // let randomSong;
    // for (let i = 0; i < noOfArtists; i++) {
    //     randomSong = copyArr[Math.floor(copyArr.length * Math.random())];
    //     let index = copyArr.indexOf(randomSong);
    //     randomSongs.push(randomSong);
    //     copyArr.splice(index, 1);
    // }
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
        //console.log(droppedDivs);
    }, [droppedDivs]);

    // localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre))
    // localStorage.setItem("noOfSongs", noOfSongs)
    // localStorage.setItem("noOfArtists", noOfArtists)


    return (
        <Row className='d-flex justify-content-around'>
            <h3>Game Page</h3>
            <div className='card col-md-5 p-2'>
                {filteredSongs.slice(0, noOfSongs).map((song, index) => (
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
                                    <FontAwesomeIcon style={{color: 'white'}} key={index} icon={faCirclePlay} />
                                </button>
                            </div>

                            <div className='col-sm-6'>
                                <button className='music' onClick={() => {
                                    console.log("I was clicked")
                                    Howler.stop()
                                }}>
                                    <FontAwesomeIcon style={{color: 'white'}} icon={faCirclePause} />
                                </button>
                            </div>
                            {/* <label>{song.song}</label> */}
                        </div>

                    </div>

                ))}
            </div>

            <div className='card col-md-5 artists'>
                <div className='card-header text-center'>
                    <h3>Artists</h3>
                </div>

                <div
                    droppable='true'
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => dragDropped(e)}
                >
                    {filteredSongs.slice(0, noOfArtists).map((song, idx) => {
                        return (<div>
                            <label>{song.artist}</label>
                            {/* <img src={`${song.image}`} alt={`${song.artist} image`} style={{ width: '60%' }}  /> */}
                        </div>)
                    })}

                    {droppedDivs.map((div, index) => {
                        return (
                            <div>
                                <>
                                    <div
                                        key={index}
                                        style={{ borderStyle: 'solid', borderColor: 'red' }}>
                                        <button onClick={() => {
                                            // setCurrentSong(song);
                                            //console.log(div)
                                            const thisSound = new Howl({
                                                src: [div.song],
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

                                </>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <Link to={'/results'}>
                    <button type='button' className='btn btn-primary '>Submit</button>
                </Link>
            </div>

        </Row>
    )
}

export default Game;
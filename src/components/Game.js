import React, { useState, useEffect } from 'react'
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
const Game = ({ selectedGenre, noOfSongs, noOfArtists, songs }) => {

    
    const [currentSong, setCurrentSong] = useState('');
    const [thisHowl, setThisHowl] = useState({});
    const [droppedDivs, setDroppedDivs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);

      if (filteredSongs.length === 0) { 
        const newFilteredSongs = songs.sort((a, b) => 0.5 - Math.random()).slice(0, 4);
        setFilteredSongs(newFilteredSongs);
      }
    

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
            {filteredSongs.slice(0, noOfSongs).map((song, index) => (
                <div style={{ width: '400px' }}>
                    {song.song}
                    <div
                        draggable
                        onDragStart={(e) => {
                            setCurrentSong(song.previewUrl)
                            //console.log("this is current song", currentSong) not the same song
                            dragStarted(e, index)
                        }}
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
                        {filteredSongs.slice(0, noOfArtists).map((artist, idx) => {
                            return(
                                <button>{artist.artist}</button>
                            )
                        })}
                    </div>

                </div>

            ))}

            <div>
                <h3>Artists</h3>
                <div
                    droppable='true'
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => dragDropped(e)}
                    style={{ height: '800px', width: '300px', borderStyle: 'solid', borderColor: 'black' }}>
                    { filteredSongs.slice(0, noOfArtists).map((song, idx) => {
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

        </div>
    )
}

export default Game;
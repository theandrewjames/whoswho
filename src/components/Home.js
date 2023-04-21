import React, { useEffect, useState } from 'react'
import { Route, Link, ReactDOM } from 'react-router-dom'
import fetchFromSpotify, { request } from '../services/api'
import Game from './Game';
import { Container } from 'react-bootstrap';
import '../css/home.css'

const AUTH_ENDPOINT =
  'https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token'
const TOKEN_KEY = 'whos-who-access-token'

const Home = () => {
  const [genres, setGenres] = useState([])
  const [songs, setSongs] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem('genre') == null ? 'Please select a genre' : localStorage.getItem('genre'))
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState('')
  const [noOfSongs, setNoOfSongs] = useState(localStorage.getItem('numSongs') == null ? 1 : localStorage.getItem('numSongs'))
  const [noOfArtists, setNoOfArtist] = useState(localStorage.getItem('numArtists') == null ? 2 : localStorage.getItem('numArtists'))
  const [errMsg, setErrMsg] = useState('')
  const [submit, setSubmit] = useState(false)

  const loadGenres = async t => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: 'recommendations/available-genre-seeds'
    })
    setGenres(response.genres)
    setConfigLoading(false);

  }
  const loadSongsArtists = async t => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: token,
      endpoint: "search?type=track&limit=20&q=genre:" + selectedGenre
    })
      .then(response => {
        const songArray = []
        for (let i = 0; i < response.tracks.items.length; i++) {
          songArray.push(
            {
              artist: response.tracks.items[i].artists[0].name,
              song: response.tracks.items[i].name,
              image: response.tracks.items[i].album.images[0].url,
              previewUrl: response.tracks.items[i].preview_url
            })
        }
        setSongs(songArray)
        setConfigLoading(false)
      })
  }

  //To see songs useState uncomment
  // useEffect(() => {
  //   console.log(songs);
  // }, [songs]);

  useEffect(() => {
    setAuthLoading(true)
    const storedTokenString = localStorage.getItem(TOKEN_KEY)
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString)
      if (storedToken.expiration > Date.now()) {
        //console.log('Token found in localstorage')
        setAuthLoading(false)
        setToken(storedToken.value)
        loadGenres(storedToken.value)
        return
      }
    }
    //console.log('Sending request to AWS endpoint')
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken))
      setAuthLoading(false)
      setToken(newToken.value)
      loadGenres(newToken.value)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedGenre) {
      setErrMsg('Please select a genre')
      return;
    }

    if (noOfSongs > noOfArtists) {
      setErrMsg('The No. of Songs cannot be greater than the No. of Artists.')
      return;
    }

    setErrMsg('')
    loadSongsArtists()
    localStorage.setItem('genre', selectedGenre)
    localStorage.setItem('numSongs', noOfSongs)
    localStorage.setItem('numArtists', noOfArtists)
    setSubmit(true)
  }

  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {submit ? (
        <Container>
          <Game songs={songs} selectedGenre={selectedGenre} noOfSongs={noOfSongs} noOfArtists={noOfArtists} />
        </Container>
      ) : (
        <Container>
        
          <div className='card d-flex justify-content-center col-md-6 mx-auto border-success'>
            <h3 className='card-header bg-success text-center' style={{color: 'white'}}> Choose Your Settings</h3>
            <div className='vertical-align p-4'>
              <div>
                <h5>Genre:</h5>
                <select
                  className='form-select mb-3'
                  value={selectedGenre}
                  onChange={event => setSelectedGenre(event.target.value)}
                >
                  <option value='' />
                  {genres.map(genre => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>

              </div>
              <div>
                <h5># of Songs:</h5>
                <select
                  className='form-select mb-3'
                  value={noOfSongs}
                  onChange={event => setNoOfSongs(Number(event.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div>
                <h5># of Artists:</h5>
                <select
                  className='form-select mb-3'
                  value={noOfArtists}
                  onChange={event => setNoOfArtist(Number(event.target.value))}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className='text-center'>
                <p
                  className={errMsg ? 'errfont' : ''}
                >
                  {errMsg}
                </p>
                <button type="button" className="btn btn-success" onClick={(e) => handleSubmit(e)}>Play</button>
              </div>
            </div>
          </div>
        </Container>
      )}

    </>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import { Route, Link, ReactDOM } from 'react-router-dom'
import fetchFromSpotify, { request } from '../services/api'
import Game from './Game';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import '../css/home.css'

const AUTH_ENDPOINT =
  'https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token'
const TOKEN_KEY = 'whos-who-access-token'

const Home = () => {
  const [genres, setGenres] = useState([])
  const [songs, setSongs] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState('')
  const [noOfSongs, setNoOfSongs] = useState(1)
  const [noOfArtists, setNoOfArtist] = useState(2)
  const [errMsg, setErrMsg] = useState('')
  const [submit, setSubmit] = useState(false)

  const loadGenres = async t => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: 'recommendations/available-genre-seeds'
    })
    //console.log(response)
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
        //console.log(response)
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
        console.log('Token found in localstorage')
        setAuthLoading(false)
        setToken(storedToken.value)
        loadGenres(storedToken.value)
        return
      }
    }
    console.log('Sending request to AWS endpoint')
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
          <div className="p-4 text-center">
            <h2 >Welcome to Who's Who</h2>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling extra
              attention to featured content or information.
            </p>

            <hr className="my-4" />
          </div>

          <div className='card d-flex justify-content-center col-md-6 mx-auto'>
            <h3 className='card-header text-center'> Choose Your Settings</h3>
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
                <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            </div>
          </div>
        </Container>
      )}

    </>
  )
}

export default Home

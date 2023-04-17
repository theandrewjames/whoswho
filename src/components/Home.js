import React, { useEffect, useState } from 'react'
import fetchFromSpotify, { request } from '../services/api'

const AUTH_ENDPOINT =
  'https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token'
const TOKEN_KEY = 'whos-who-access-token'

const Home = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState('')
  const [noOfSongs, setNoOfSongs ] = useState(1)
  const [noOfArtists, setNoOfArtist ] = useState(2)
  const [errMsg, setErrMsg] = useState('')

  const loadGenres = async t => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: 'recommendations/available-genre-seeds'
    })
    console.log(response)
    setGenres(response.genres)
    setConfigLoading(false)
  }

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

    if(!selectedGenre){
      setErrMsg('Please select a genre')
      return;
    }
    
    setErrMsg('')
    console.log("I was clicked")
    console.log(selectedGenre)
    console.log(noOfSongs)
    console.log(noOfArtists)
  }

  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
    <div>
      Genre:
      <select
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
      # of Songs:
      <select
        value={noOfSongs}
        onChange={event => setNoOfSongs(Number(event.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </div>
    <div>
      # of Artists:
      <select
        value={noOfArtists}
        onChange={event => setNoOfArtist(Number(event.target.value))}
      >
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
    </div>
    <div>
      <p>{errMsg}</p>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
    </>
  )
}

export default Home

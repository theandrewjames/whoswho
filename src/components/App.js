import React from 'react'
import { Route } from 'react-router-dom'
import Results from './Results'
import '../css/home.css'
import Home from './Home'
import { Header } from './Header'
import { Footer } from './Footer'
const App = () => (
  <>
  <div className='main'>
    <Header/>
    <Route path='/results' render={() => <Results></Results>}></Route>
    <Route exact path='/' component={Home} />
  </div>
  <Footer/>
  </>
)

export default App

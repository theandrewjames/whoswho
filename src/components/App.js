import React from 'react'
import { Route } from 'react-router-dom'
import Results from './Results'

import Home from './Home'

const App = () => (
  <div>
    <Route path='/play'></Route>
    <Route path='/results' render={() => <Results></Results>}></Route>
    <Route exact path='/' component={Home} />
  </div>
)

export default App

import React from 'react'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      </Routes>
      
    </div>
  )
}

export default App
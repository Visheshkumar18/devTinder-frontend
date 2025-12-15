import React from 'react'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './Store/appStore'
import Feed from './components/Feed'
import SignUp from './components/SignUp'
import Connections from './components/Connections'
import Requests from './components/Requests'


const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Routes>
      <Route path='/' element={<Body/>}>
       <Route path='/' element={<Feed/>}></Route>
      <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/connections' element={<Connections/>}/>
      <Route path='/requests' element={<Requests/>}/>


      </Route>
      </Routes>
      </Provider>
      
    </div>
  )
}

export default App
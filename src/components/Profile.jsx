import React from 'react'
import EditProfile from './EditProfile'
import UserCard from './userCard'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user=useSelector(store=>store.feed)
  return  (
    <div className='flex justify-center items-center'>
      <EditProfile/>
      <UserCard user={user}/>
    </div>
  )
}

export default Profile
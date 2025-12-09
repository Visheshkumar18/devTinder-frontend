import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUser } from '../Store/Slice/userSlice'

const Body = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const fetchUser=async()=>{
    try {
      const res=await axios.get('http://localhost:3000/profile/view',{withCredentials:true});
      dispatch(addUser(res.data.user));

    } catch (error) {
      if(error.response.status==401){
        toast.error(`${error.response.data}`)
      }
      else{
        toast.error("something went wrong")
      }
      navigate('/login');
      
    }
  }
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body
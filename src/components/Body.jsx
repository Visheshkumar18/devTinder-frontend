import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Store/Slice/userSlice'

const Body = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user)
  const fetchUser=async()=>{
    try {
      if(user)return;
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/view`,{withCredentials:true});
      dispatch(addUser(res.data.user));

    } catch (error) {
      if(error.response.status==401){
        toast.error(`${error.response.data}`)
        const isAuthPage = location.pathname.includes("/login");
        console.log(isAuthPage)
       navigate(isAuthPage ? "/login" : "/signup");
      }
      else{
        toast.error("something went wrong")
      }
      
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
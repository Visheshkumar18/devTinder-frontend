import React, { useEffect } from 'react'
import axios from 'axios';
import UserCard from './userCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Store/Slice/feedSlice';
const Feed = () => {
  const dispatch=useDispatch();
  const feed =useSelector((store)=>store.user);
  const getFeed=async()=>{
    if(feed)return;
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed`,{withCredentials:true});
    dispatch(addFeed(res.data));
  }
  useEffect(()=>{
    getFeed();
  },[])
  return feed&& (
    <div className='flex justify-center items-center'>
    <UserCard user={feed}/>
    </div>
  )
}

export default Feed
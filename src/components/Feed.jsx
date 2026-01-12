import React, { useEffect } from 'react'
import axios from 'axios';
import UserCard from './userCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Store/Slice/feedSlice';
const Feed = () => {
  const dispatch=useDispatch();
  const feed =useSelector((store)=>store.feed);
  const getFeed=async()=>{
      if(feed && feed.length>0)return;
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed`,{withCredentials:true});
    console.log("res of fedd",res);
    dispatch(addFeed(res.data));
  }
  useEffect(()=>{
    getFeed();
  },[])
  if(feed=== null)return null;
  if (feed.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500 text-2xl">
        You've seen all new users
      </p>
    );
  }
  return (
    <div className='flex justify-center items-center'>
    <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed
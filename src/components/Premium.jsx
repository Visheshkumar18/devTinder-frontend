import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
export const Premium = () => {
  const[isUserPremium,setUserPremium]=useState(false);
  useEffect(()=>{
    verifyPremiumUser()
  },[]);
  const verifyPremiumUser=async()=>{
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/premium/verify`,{withCredentials:true});
    if(res.data.isPremium){
      setUserPremium(true);
    }
  }
  const HandleClickBuy=async(type)=>{
    const order=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/create`,{membershipType:type},{withCredentials:true});
    // it should open razorpay dialog box
    const {amount,orderId,notes,keyId}=order.data;
    const  options = {
    key: keyId, 
    amount,
    currency,
    name: "DevTinder", //your business name
    description: "Test Transaction",
     prefill: { 
        name: notes.firstName+" "+notes.lastName,
        email:notes.email, 
    },
    order_id:orderId, 
    notes,
    handler:verifyPremiumUser
};
    const rzp=new window.RazorPay(options);
    rzp.open();
  }
  return isUserPremium?(" You are already a premium user"): (
   <div className='m-10'>
     <div className="flex w-full flex-col lg:flex-row">
   <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center text-xl">
    <h1 className='font-bold text-3xl'>Silver Membership</h1>
    <ul>
        <li>  → chat with other people</li>
        <li>  → 100 connections Request per day</li>
        <li>  → Blue Tick</li>
        <li>  → 3 Months Plan</li>
    </ul>
    <button onClick={()=>HandleClickBuy('silver')} className='btn btn-primary'>Buy Silver</button>
   </div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center text-xl">
    <h1 className='font-bold text-3xl'>Gold Membership</h1>
    <ul>
        <li>  → chat with other people</li>
        <li>  → Infinite connections Request per day</li>
        <li>  → Blue Tick</li>
        <li>  → 6 Months Plan</li>
    </ul>
    <button onClick={()=>HandleClickBuy('gold')} className='btn btn-secondary'>Buy Gold</button>
  </div>
</div>
   </div>
  )
}

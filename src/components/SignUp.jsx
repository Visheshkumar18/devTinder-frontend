import React, { useState } from 'react'
import Email from './Email';
import Password from './Password';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("")
    const [age,setAge]=useState("")
    const [about,setAbout]=useState("Hey, I'm using the Dev Tinder!");
    const [PhotoUrl,setPhotoUrl]=useState("")
    const [gender,setGender]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
  const navigate =useNavigate();

    const HandleSignUp=async()=>{

        try {
            const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,{firstName,lastName,age,about,PhotoUrl,gender,email,password})
            if(res.data){
              toast.success("Account created successfully")
              navigate('/login');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
    <div className='flex justify-center items-center'>
    <div className=" gap-2 card card-sm bg-base-300 w-96 m-4 items-center p-4 flex justify-center ">
        <p className="text-2xl font-mono from-neutral-600">SignUp</p>
      <input     
        type="text"
        placeholder="First Name"
        className="input input-neutral"
        onChange={e=>setFirstName(e.target.value)}
        value={firstName}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="input input-neutral"
        onChange={e=>setLastName(e.target.value)}
        value={lastName}
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-neutral"
        onChange={e=>setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-neutral"
        onChange={e=>setPassword(e.target.value)}
        value={password}
        required
      />
      
      
      <input type="text" 
      placeholder="Age" 
      className="input input-neutral"
      onChange={e=>setAge(e.target.value)}
      value={age}
     />

      <input
        type="text"
        placeholder="Photo Url"
        className="input input-neutral"
        onChange={e=>setPhotoUrl(e.target.value)}
        value={PhotoUrl}
      />
       <input type="text" 
       placeholder="About" 
       className="input input-neutral" 
       onChange={e=>setAbout(e.target.value)}
       value={about}
       />
        <input type="text" 
        placeholder="Gender" 
        className="input input-neutral"
        onChange={e=>setGender(e.target.value)}
        value={gender}
        />
        <button className="btn btn-primary" onClick={HandleSignUp}>Save Profile</button>

     </div>
     </div>
  )
}

export default SignUp
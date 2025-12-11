import React, { useState } from "react";
import Email from "./Email";
import Password from "./Password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/Slice/userSlice";

const Login = () => {
    const [email,setEmail]=useState('vishesh@gmail.com');
    const [password,setPassword]=useState('123123');
    const navigate=useNavigate();
    const dispatch =useDispatch();
    const HandleLogIn=async()=>{
        try {
            const res=await axios.post('http://localhost:3000/login',{
            email,password
        },{withCredentials:true});
        if(res.data){
            toast.success(`${res.data.firstName} LogIn Successfully!!`);
            dispatch(addUser(res.data));
            navigate('/')
        }
        } catch (error) {
            toast.error(error);
          console.log(error)  
        }
    }
  return (
    <div className="flex justify-center  mt-30">
      <div className="card bg-neutral text-neutral-content min-w-sm">
        <div className="card-body items-center text-center gap-4">
          <h2 className="card-title">LogIn</h2>
            <Email email={email} setEmail={setEmail}/>
            <Password password={password} setPassword={setPassword}/>
          <div className="card-actions justify-end">
            <button onClick={HandleLogIn} className="btn btn-primary">LogIn</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Store/Slice/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const HandleLogOut=async()=>{
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`,{},{withCredentials:true})
      navigate('/login')
      toast.success(`${res.data}`);

      dispatch(removeUser());

    }catch(err){

    }
  }
  const HandleConnections=async()=>{
    navigate('/connections');
  }
  const HandleRequest=async()=>{
    navigate('/requests');
  }
  const user =useSelector((store)=>store.user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a onClick={()=>navigate('/')} className="btn btn-ghost text-xl">devTinder</a>
      </div>
      <div className="flex gap-2 items-center">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        /> */}
         {user&&(<p>{`Welcome, ${user?.firstName}`}</p>)}
        {user&&(<div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar m-4"
          >
            {user&&(<div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoUrl}
              />
             
            </div>)}
            
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={()=>navigate('/profile')} className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a onClick={HandleConnections}>Connections</a>
            </li>
            <li>
             <Link to="/premium">Premium</Link>
            </li>
            <li>
              <a onClick={HandleRequest}>Friend Requests</a>
            </li>
            <li>
              <a onClick={HandleLogOut}>Logout</a>
            </li>
          </ul>
        </div>)}
      </div>
    </div>
  );
};

export default Navbar;

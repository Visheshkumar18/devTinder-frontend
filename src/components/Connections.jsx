import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Store/Slice/connectionSlice";

const Connections = () => {
  const dispatch=useDispatch();
  const connections=useSelector((store)=>store.connection)
  const getConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/connection`,
        { withCredentials: true }
      );
      if (res.data && res.data.data.length>0) {
        dispatch(addConnections(res.data.data));

      }
    } catch (error) {
        toast.error(`${error}`);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if(!connections)return <h1 className="text-2xl font-semibold text-center my-3.5">No connection found</h1> ;
  console.log(connections)
  if(connections.length===0) return 
  return <div className="text-center my-5">
    <h1 className="text-3xl text-white font-bold">Connections</h1>
    {connections.map((connection)=>{
      const {firstName,lastName,photoUrl,age,gender,about}=connection;
      return (
        <div className="flex items-center m-4 bg-base-300 rounded-3xl p-3 max-w-1/2">
          <div><img className="max-w-20 max-h-20 rounded-3xl" src={photoUrl} alt="photo" /></div>
          <div className="text-left flex flex-col ml-3">
            <h1 className="text-xl font-bold">{firstName+" "+lastName}</h1>
           {age&&gender&&<p>{age+","+gender}</p>}
            <p>{about}</p>
          </div>
        </div>
      )
    })}

  </div>;
};

export default Connections;

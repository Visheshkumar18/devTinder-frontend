import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Store/Slice/connectionSlice";
import { Link } from "react-router-dom";

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
  if(connections.length===0) return 
  return <div className="text-center my-5">
  <h1 className="text-3xl text-white font-bold mb-6">Connections</h1>

  {connections.map((connection) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

    return (
      <div
        key={_id}
        className="flex justify-between items-center max-w-2xl mx-auto bg-base-300 rounded-3xl p-5 mb-4"
      >
        {/* Left Section */}
        <div className="flex items-center">
          <img
            className="w-20 h-20 rounded-2xl object-cover"
            src={photoUrl}
            alt="profile"
          />

          <div className="text-left flex flex-col ml-4">
            <h1 className="text-xl font-bold">
              {firstName} {lastName}
            </h1>

            {age && gender && (
              <p className="text-sm opacity-70">
                {age}, {gender}
              </p>
            )}

            <p className="text-sm mt-1">{about}</p>
          </div>
        </div>

        {/* Right Section */}
         <Link to={`/chat/${_id}`}> <button className="btn btn-outline btn-error px-4 ">Chat</button></Link>
      </div>
    );
  })}
</div>

};

export default Connections;

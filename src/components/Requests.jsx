import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../Store/Slice/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const HandleRequest = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/request/received`,
      { withCredentials: true }
    );
    dispatch(addRequest(res.data.data));
  };
  useEffect(() => {
    HandleRequest();
  }, []);
  if (!requests)
    return (
      <h1 className="text-2xl font-semibold text-center my-3.5">
        No request found
      </h1>
    );
  return (
    <div className="text-center my-5">
      <h1 className="text-3xl text-white font-bold">Incomming Request</h1>
      {requests.map((request) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } =
    request.fromUserId;

  return (
    <div
      key={_id}
      className="flex justify-between items-center m-4 bg-base-300 rounded-3xl p-4 max-w-2/4"
    >
      <img
        className="w-20 h-20 rounded-3xl object-cover"
        src={photoUrl}
        alt="photo"
      />

      <div className="text-left flex flex-col ml-4 flex-1">
        <h1 className="text-xl font-bold">
          {firstName} {lastName}
        </h1>

        {age && gender && (
          <p className="text-sm opacity-70">
            {age}, {gender}
          </p>
        )}

        <p className="text-sm opacity-80 line-clamp-2">
          {about}
        </p>
      </div>

      <div className="flex space-x-2 ml-4">
        <button className="btn btn-primary">Reject</button>
        <button className="btn btn-secondary">Accept</button>
      </div>
    </div>
  );
})}
</div>
  );
};

export default Requests;

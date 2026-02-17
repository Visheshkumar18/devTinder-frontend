import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Store/Slice/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAge(user.age);
      setAbout(user.about);
      setGender(user.gender);
      setPhotoUrl(user.photoUrl);
    }
  }, [user]);

  const HandleSave = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/profile/edit`,
        { firstName, lastName, age, about, photoUrl, gender},
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/");
      toast.success(`${res.data.message}`);
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" gap-2 card card-md bg-base-300 w-86 m-4 items-center p-4">
        <p className="text-2xl font-mono from-neutral-600">Edit Profile</p>
        <input
          type="text"
          placeholder="First Name"
          className="input input-neutral"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input input-neutral"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="text"
          placeholder="Age"
          className="input input-neutral"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />

        <input
          type="text"
          placeholder="Photo Url"
          className="input input-neutral"
          onChange={(e) => setPhotoUrl(e.target.value)}
          value={photoUrl}
        />
        <input
          type="text"
          placeholder="About"
          className="input input-neutral"
          onChange={(e) => setAbout(e.target.value)}
          value={about}
        />
        <input
          type="text"
          placeholder="Gender"
          className="input input-neutral"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        />
        <button className="btn btn-primary" onClick={HandleSave}>
          Save Profile
        </button>
      </div>
      <UserCard user={{ firstName, lastName, age, about, photoUrl, gender }} />
    </div>
  );
};

export default EditProfile;

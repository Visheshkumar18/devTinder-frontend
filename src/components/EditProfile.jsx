import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
    const user=useSelector(store=>store.user)
    const [firstName,setFirstName]=useState(user?.firstName);
    const [lastName,setLastName]=useState(user?.lastName)
    const [age,setAge]=useState(user?.age)
    const [about,setAbout]=useState(user?.about)
    const [PhotoUrl,setPhotoUrl]=useState("")
    const [Gender,setGender]=useState(user?.gender)
    const dispatch=useDispatch();
    const HandleSave=async()=>{
        try {
            const res=axios.patch(`${import.meta.env.VITE_BACKEND_URL}/profile/edit`,{firstName,lastName,age,about,PhotoUrl,Gender},{withCredentials:true})
            console.log("new res",res);
             dispatch(addUser(res.data))
            toast.success("Your Profile Updated Successfully")
        } catch (error) {
            toast.error(error);
        }
    }
    return (
    <div className=" gap-2 card card-sm bg-base-300 w-86 m-4 items-center p-4">
        <p className="text-2xl font-mono from-neutral-600">Edit Profile</p>
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
        value={Gender}
        />
        <button className="btn btn-primary" onClick={HandleSave}>Save Profile</button>

     </div>
  );
};

export default EditProfile;

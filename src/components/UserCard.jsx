import axios from "axios"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../Store/Slice/feedSlice";



const UserCard = ({ user }) => {
  const dispatch=useDispatch();
  const handleSendRequest=async(status,userId)=>{
    try {
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/request/send/${status}/${userId}`,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      
    }
  }
  return (
    <div className="card card-sm bg-base-300 w-86 shadow-lg m-4">
      <figure>
        <img src={user?.photoUrl|| "/default_image.svg"}  alt="User" />

      </figure>

      <div className="card-body">
        <h2 className="card-title">{user?.firstName +" "+user?.lastName || "Unknown User"}</h2>
        <p>{`${user?.age}, ${user?.gender}`}</p>
        <p>{user?.about}</p>

        <div className="card-actions justify-center gap-x-3 p-3">
            <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",user._id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",user._id)}>Intrested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard

import React from 'react'


const UserCard = ({ user }) => {
  return (
    <div className="card card-sm bg-base-300 w-86 shadow-lg m-4">
      <figure>
        <img src={ "/default_image.svg"}  alt="User" />

      </figure>

      <div className="card-body">
        <h2 className="card-title">{user?.firstName +" "+user?.lastName || "Unknown User"}</h2>
        <p>{user?.age}
          <span>{user?.gender}</span>
        </p>
        <p>{user?.about}</p>

        <div className="card-actions justify-center gap-x-3 p-3">
            <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard

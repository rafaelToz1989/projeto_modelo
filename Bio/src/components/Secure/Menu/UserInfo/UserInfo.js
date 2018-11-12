import React from 'react'
import './UserInfo.css'

const MenuItem = (props) => {
    return ( 
        <div>
        <div className="image-cropper">
            <img className="imgAnalisar" alt="profile" src={props.imageUrl} /> 
        </div>
        <div className="userInfo">
            <span className="userInfo">{props.name} </span>
        </div>
        </div>
        )
}

export default MenuItem
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction";


function User({person}){
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData);
const[following,setFollowing] = useState(person.followers.includes(user._id))
    
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const handleFollow = () => {
    if (following) {
      dispatch(unFollowUser(person._id, user._id));
    } else {
      dispatch(followUser(person._id, user._id));
    }
    setFollowing(!following);
  };

    useEffect(() => {
        setFollowing(person.followers.includes(user._id));
      }, [person.followers, user._id]);

    return(

        <div>
 <div className="followers">
            <div>
                <img  src={
          person.profilePicture
            ? serverPublic + person.profilePicture
            : serverPublic + "defaultProfile.png"
        } alt="" className="followerImg"/>
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button className={following? "button fc-button UnfollowButton": "button fc-button"} onClick={handleFollow}>
               {following? "Unfollow": "Follow"}
            </button>
        </div>
        </div>
    )
}
export default User;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import { authUser } from '../lib/api';
  
  function Profile() {
    const [userProfile, setUserProfile] = useState("")
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchUser(){
         const res = await authUser();
         if(res) setUserProfile(res.data.avatar);
        }fetchUser();
    },[])

    return (
        <div 
                className="w-20 h-20 rounded-full sticky bottom-5 left-full mr-5 bg-black 
                           flex justify-center items-center shadow-[5px_5px_0px_black] cursor-pointer 
                           hover:scale-110 hover:animate-bounce transition"
                onClick={()=>{navigate("/profile")}}
            >
              
                 <img className="w-20 h-20 rounded-full border-4 border-white" src={userProfile}></img> 
              
            </div>
    )
  }
  
  export default Profile
  
  
  
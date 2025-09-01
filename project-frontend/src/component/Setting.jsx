import React from 'react'
import { useNavigate } from 'react-router'

function Setting() {
    const navigate = useNavigate();
    return (
        <div className='h-full fixed top-0 right-0 z-10 mt-24 w-60 
                grid grid-cols-2 gap-2 items-center 
                bg-white/20 backdrop-blur-lg p-4 auto-rows-[6rem]'>
            <button className="h-20 w-20 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/watch-history")}}>history</button>
            <button className="h-20 w-20 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/video-upload")}}>upload Video</button>
            <button className="h-20 w-20 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/tweet")}}>upload Tweet</button>
            <button className="h-20 w-20 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/change-password")}}>password Change</button>
            <button className="h-20 w-20 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/profile-update")}}>update User</button>
            <button className="h-20 w-20 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/update-comment")}}>update Comments</button>
            <button className="h-15 font-extrabold ml-4 mt-80 w-40 shadow-[6px_6px_0px_black] rounded-full bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2" onClick={()=>{navigate("/logout")}}>Logout</button>
            
         
        </div>
    )
}

export default Setting

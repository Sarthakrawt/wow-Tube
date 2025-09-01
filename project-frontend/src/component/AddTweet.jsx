import React,{useRef} from 'react'
import { addTweet, getAllTweets } from '../lib/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function AddTweet() {
   const tweetRef = useRef("");
   const navigate = useNavigate();
  const submit = async()=>{
    if(tweetRef.current.value === ""){
     alert("content should'nt be empty")
    }
  const res = await addTweet({content: tweetRef.current.value});
   if(res) alert("Successfully tweeted")
    tweetRef.current.value = ""
  }
  useEffect(()=>{
    async function allTweet(){
   const res = await getAllTweets();
   console.log(res.data)
    }
    allTweet();
  },[])
    return (
        <div className='flex flex-col w-full items-center '>
             <div className="w-full flex flex-wrap px-6 py-4 items-center sticky top-0 z-10 justify-between 
                            bg-gradient-to-r from-yellow-300 via-pink-200 to-orange-300 
                            border-b-4 border-black rounded-b-2xl shadow-[4px_4px_0px_black]">
                <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition" onClick={()=>navigate("/home")}>
                    <img className="w-14 h-14 drop-shadow-[3px_3px_0px_black]" src="../galaxy.png" alt="logo" />
                    <h1 className="font-[Fredoka_One] text-pink-700 text-2xl font-extrabold">WowTube</h1>
                </div>
             </div>
       
        <div className='flex flex-col w-1/2 items-center justify-center mt-40 gap-5 bg-white/30 backdrop-blur-xl border-3 shadow-[10px_10px_0px_black] h-100 rounded-2xl'>
          <div className='font-extrabold text-4xl mb-10'>Add Tweet</div>
         <label className='font-extrabold text-2xl text-sky-400' >content</label>
            <input type='text'className='border-4 border-black rounded-xl w-80 h-10   focus:outline-none focus:ring-4 focus:ring-pink-400 focus:scale-105 ' ref={tweetRef}></input>
            <button  className="bg-pink-500 text-white px-4 py-2 rounded-xl border-4 border-black 
                                   hover:bg-pink-600 hover:rotate-2 hover:scale-105 transition 
                                   shadow-[3px_3px_0px_black] font-[Fredoka_One] active:translate-y-1 active:shadow-[1px_1px_0px_black] w-80 " onClick={(event)=>{
             event.preventDefault();
             submit();
            }}>tweet</button>
        </div>
           
        </div>
    )}

export default AddTweet

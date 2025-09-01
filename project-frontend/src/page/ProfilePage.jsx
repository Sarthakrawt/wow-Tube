import React, { useEffect, useState } from 'react';
import { authUser, getUsersChannelVideos, getUserTweets } from '../lib/api.js';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserTweet,deleteUserVideo } from '../lib/api.js';
import Setting from '../component/Setting.jsx';

function ProfilePage() {
  const [user, setUser] = useState(null); 
  const [userVideos, setUserVideos] = useState([]);
  const [tweets , setTweets] = useState([])
  const navigate = useNavigate();
  const [count , setCount] = useState(0);
  const [settingvisible , setSettingvis] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await authUser();
        setUser(userData.data);
        console.log('User fetched');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function getUsersVideos() {
      if (!user?._id) return;
      const res = await getUsersChannelVideos(user._id);
      setUserVideos(res.data);
    }
    getUsersVideos();
  }, [user,count]);


  useEffect(()=>{
    async function getProfileTweets(){
      const res = await getUserTweets();
      if(res) setTweets(res.data);
    }getProfileTweets();
  },[count])

  const Del = async(tweetId)=>{
    const res =await deleteUserTweet(tweetId) ;
     console.log(res);
      setCount(count +1);
  };
  const deleteVideo  = async(videoId)=>{
    const res = await deleteUserVideo(videoId);
    setCount(count+1);
  }
  if (!user) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-4xl font-extrabold text-white bg-gradient-to-br from-pink-400 to-yellow-400">
        Loading profile... 🎨
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-green-200 to-pink-200 font-sans">
      {/* Navbar */}
     <div className="w-full flex flex-wrap px-6 py-4 items-center sticky top-0 z-10 justify-between 
                            bg-gradient-to-r from-yellow-300 via-pink-200 to-orange-300 
                            border-b-4 border-black rounded-b-2xl shadow-[4px_4px_0px_black]">
                <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition" onClick={()=>navigate("/home")}>
                    <img className="w-14 h-14 drop-shadow-[3px_3px_0px_black]" src="../galaxy.png" alt="logo" />
                    <h1 className="font-[Fredoka_One] text-pink-700 text-2xl font-extrabold">WowTube</h1>
                </div>
                <div className='flex flex-row justify-between items-center gap-10'>
                <Link to="/about" className="h-13 items-center flex justify-center w-30 shadow-[6px_6px_0px_black] rounded-full bg-purple-400 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2 hover:rotate-2">about</Link>
              <Link
          className="bg-yellow-400 hover:bg-yellow-500 h-13 items-center flex justify-center w-30 shadow-[6px_6px_0px_black] rounded-full hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2 hover:rotate-2 h-13 "
          to="/video-upload"
        >
          Upload Video 
        </Link>
        <Link to="/tweet" className="h-13 items-center flex justify-center w-30 shadow-[6px_6px_0px_black] rounded-full bg-blue-400 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2 hover:rotate-2">Tweet</Link>
        <button onClick={()=>{setSettingvis(prev => !prev)}} className="mr-10 text-3xl hover:scale-130 active:scale-100">&#9881;</button>
        
                </div>
                
      </div>
    <div>{
            settingvisible? <Setting/>: <div></div>
          }</div>
      {/* Cover + Profile */}
 <div
        className="w-full h-64 bg-cover bg-center relative border-b-[8px] border-black shadow-md rounded-b-3xl"
        style={{
          backgroundImage: `url(${
            user.coverImage ||
            'https://via.placeholder.com/600x200/FFD1DC/FF6B81?text=Channel+Cover'
          })`,
        }}
      >
        <div className="absolute bottom-0 left-0 p-6 flex items-center gap-6 bg-black/40 w-full border-t-[6px] border-black">
          <img
            src={
              user.avatar ||
              'https://via.placeholder.com/80/FFA07A/FFFFFF?text=Avatar'
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-[6px] border-white object-cover shadow-lg bg-pink-200"
          />
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">{user.username}</h2>
        </div>
      </div>

      {/* Videos */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6">Your Videos 🎥</h2>
        {userVideos.length === 0 ? (
          <div className="w-full h-40 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 border-black shadow-lg">
            No videos yet. Let's make some! 🎬
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {userVideos.map((video, indx) => (
              <div
                key={indx}
                className="bg-white rounded-2xl shadow-xl border-4 border-black overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:rotate-1 relative "
              >
                <video className="w-full h-48 object-cover border-b-4 border-black" controls>
                  <source
                    src={`http://localhost:8000/${encodeURI(
                      video.videoFile.replace(/\\/g, "/").replace("public/", "")
                    )}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4 bg-gradient-to-r  justify-between from-green-300 to-blue-300 border-t-4 border-black">
                     <h3 className="text-xl font-bold text-gray-900 truncate">{video.title || `Video ${indx + 1}`}</h3>
                  <p className="text-sm text-gray-800 truncate">{video.description || "No description"}</p>
       
                </div>
                <div className="  w-10 h-10 absolute text-blue text-3xl bottom-3 right-1 cursor-grab z-1 hover:scale-120 active:scale-70" onClick={()=>{deleteVideo(video._id)}}>x</div>
              </div>
            ))}
          </div>
        )}
       <div className="p-6 min-h-screen mt-10">
  

  {/* Channel Tweets Section */}
<div className="">
  <h2 className="text-3xl text-blue-700 font-extrabold mb-6 drop-shadow-md">
    🐦 My Channel Tweets
  </h2>

  {tweets.length === 0 ? (
    <div className="w-full h-32 bg-pink-300 rounded-3xl flex items-center justify-center text-black text-xl font-extrabold border-[6px] border-black shadow-md animate-pulse">
      ✨ No tweets yet...
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tweets.map((tweet, indx) => (
        <div
          key={indx}
          className="bg-white rounded-3xl border-[6px] border-black shadow-[6px_6px_0px_black] p-6 flex flex-col gap-4 hover:scale-105 hover:rotate-1 transition-transform"
        >
          {/* Tweet Header */}
          <div className="flex items-center gap-3 relative">
            <img
              src={user.avatar || "https://via.placeholder.com/50/FFA07A/FFFFFF?text=👤"}
              alt="avatar"
              className="w-12 h-12 rounded-full border-[3px] border-black object-cover shadow-sm"
            /> 
            <div>
              <h4 className="text-lg font-extrabold text-purple-800">
                {user.username}
              </h4>
              <p className="text-xs text-gray-500">@{user.username.toLowerCase()}</p>
            </div>
            <div className='absolute top-0 right-0 text-2xl font-bold cursor-pointer hover:scale-130 active:scale-90' onClick={()=>Del(tweet._id)}>x</div>
          </div>

          {/* Tweet Content */}
          <p className="text-gray-800 text-base font-semibold leading-relaxed">
            {tweet.content}
          </p>

          {/* Footer (date/likes) */}
          <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
            <span>📅 {new Date(tweet.createdAt).toLocaleDateString()}</span>
            <span>❤️ {tweet.likes?.length || 0}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

</div>
      </div>
      
    </div>
  );
}

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import { channelStates, getChannelSubscribers, getChannelTweets, getUsersChannelVideos, toggleSubscription } from '../lib/api.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function ChannelProfiles() {
  const [userVideos, setUserVideos] = useState([]);
  const [subscriber, setSubsribers] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [allVideos, setAllVideos] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const[tweets, setTweets] = useState([]);
  const video = useSelector((state) => state.video.videoId);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideoChannel() {
      if (!video || !video.owner?._id) return;
      try {
        const res = await getUsersChannelVideos(video.owner._id);
        setUserVideos(res.data);
        
      } catch (error) {
        console.error("Error fetching channel videos:", error);
      }
    }
    fetchVideoChannel();
  }, [video]);

  useEffect(() => {
    async function fetchState() {
      if (!video) return;
      const res = await channelStates(video.owner._id);
      console.log("channelState is getting here", res);
      setTotalLikes(res.data.existingLike.length);
      setSubsribers(res.data.existingSubscriber.length);
      setAllVideos(res.data.existingVideo.length);
    }
    fetchState();
  }, [video, subscriber, allVideos, totalLikes]);

  const channelOwner = userVideos[0]?.owner;

  const subscribeBtn = async(channelId)=>{
    const res = await toggleSubscription(channelId);
console.log("toogle Sbuscription", res);
setSubscribed(prev => !prev);
  };
  useEffect(()=>{
    async function fetchSubsriber(){
      console.log("working")
    const res = await getChannelSubscribers(video.owner._id);
    setSubscribed(res?.data.length> 0 ? true : false);
   console.log("in fetch Subsriber",res.data.length)
  }
  if(video.owner._id) fetchSubsriber();
}
  ,[video]);

  useEffect(()=>{
    async function getTweet(){
      if(video?.owner){
        const res = await getChannelTweets(video.owner._id);
        console.log(res.data);
       setTweets(res.data);
      }
    }
    if(video) getTweet();
  },[video])
  if (!channelOwner) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-5xl font-extrabold text-white bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-400 animate-pulse">
        🎬 Loading channel... 🚀
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
        <div className="flex gap-4">
          <button className="bg-orange-400 hover:bg-orange-500 px-6 py-3 rounded-2xl text-black font-extrabold border-[5px] border-black shadow-md transition-transform hover:rotate-2 hover:scale-105">
            📼 Videos
          </button>
          <button className="bg-red-400 hover:bg-red-500 px-6 py-3 rounded-2xl text-black font-extrabold border-[5px] border-black shadow-md transition-transform hover:-rotate-2 hover:scale-105">
            🧑‍🎤 About
          </button>
        </div>
      </div>

      {/* Cover Image + Profile */}
      <div
        className="w-full h-64 bg-cover bg-center relative border-b-[8px] border-black shadow-md rounded-b-3xl"
        style={{
          backgroundImage: `url(${
            channelOwner.coverImage ||
            'https://via.placeholder.com/600x200/FFD1DC/FF6B81?text=Channel+Cover'
          })`,
        }}
      >
        <div className="absolute bottom-0 left-0 p-6 flex items-center gap-6 bg-black/40 w-full border-t-[6px] border-black ">
          <img
            src={
              channelOwner.avatar ||
              'https://via.placeholder.com/80/FFA07A/FFFFFF?text=Avatar'
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-[6px] border-white object-cover shadow-lg bg-pink-200 hover:rotate-2 hover:scale-100 "
          />
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">
            {channelOwner.username} 💫
          </h2>
            <button
                className={`ml-250 px-6 py-2 rounded-full font-heading transition-all hover:scale-110 shadow-[3px_3px_0px_black] border-[3px] border-black text-white text-lg active:translate-y-1 active:shadow-[1px_1px_0px_black]
                  ${subscribed ? "bg-red-500" : "bg-green-500"}`}
                onClick={()=>{subscribeBtn(video.owner?._id)}}
              >
                {subscribed ? "Subscribed ✅" : "Subscribe 🎉"}
              </button>
        </div>
        
      </div>

      {/* Videos Section */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl text-purple-700 font-extrabold mb-6 drop-shadow-md">
          🎥 Channel Videos
        </h2>
        {userVideos.length === 0 ? (
          <div className="w-full h-40 bg-pink-300 rounded-3xl flex items-center justify-center text-black text-2xl font-extrabold border-[6px] border-black shadow-md animate-bounce">
            💬 This channel has no videos yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {userVideos.map((video, indx) => (
              <div
                key={indx}
                className="bg-white rounded-3xl border-[6px] border-black shadow-md overflow-hidden transition-transform hover:scale-105 hover:rotate-1"
              >
                <video
                  className="w-full h-48 object-cover border-b-[6px] border-black"
                  controls
                >
                  <source
                    src={`http://localhost:8000/${encodeURI(
                      video.videoFile.replace(/\\/g, '/').replace('public/', '')
                    )}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4 bg-gradient-to-r from-blue-300 to-green-300 border-t-[5px] border-black">
                  <h3 className="text-xl font-extrabold text-gray-900 truncate">
                    {video.title || `Video ${indx + 1}`}
                  </h3>
                  <p className="text-sm text-gray-700 truncate">
                    {video.description || '✨ No description ✨'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Channel Tweets */}
     {/* Channel Tweets Section */}
<div className="p-8">
  <h2 className="text-3xl text-blue-700 font-extrabold mb-6 drop-shadow-md">
    🐦 Channel Tweets
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
          <div className="flex items-center gap-3">
            <img
              src={channelOwner.avatar || "https://via.placeholder.com/50/FFA07A/FFFFFF?text=👤"}
              alt="avatar"
              className="w-12 h-12 rounded-full border-[3px] border-black object-cover shadow-sm"
            />
            <div>
              <h4 className="text-lg font-extrabold text-purple-800">
                {channelOwner.username}
              </h4>
              <p className="text-xs text-gray-500">@{channelOwner.username.toLowerCase()}</p>
            </div>
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

     {/* Channel Stats Section */}
<div className="p-8">
  <h2 className="text-3xl text-pink-700 font-extrabold mb-6 drop-shadow-md">
    📊 Channel Stats
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
    {/* Subscribers */}
    <div className="bg-yellow-300 rounded-3xl border-[6px] border-black shadow-[6px_6px_0px_black] p-6 flex flex-col items-center hover:scale-105 hover:rotate-1 transition-transform">
      <h3 className="text-4xl font-extrabold text-black drop-shadow-sm">
        {subscriber}
      </h3>
      <p className="mt-2 text-lg font-semibold text-purple-700">Subscribers</p>
    </div>

    {/* Videos */}
    <div className="bg-green-300 rounded-3xl border-[6px] border-black shadow-[6px_6px_0px_black] p-6 flex flex-col items-center hover:scale-105 hover:-rotate-1 transition-transform">
      <h3 className="text-4xl font-extrabold text-black drop-shadow-sm">
        {allVideos}
      </h3>
      <p className="mt-2 text-lg font-semibold text-purple-700">Videos</p>
    </div>

    {/* Likes */}
    <div className="bg-blue-300 rounded-3xl border-[6px] border-black shadow-[6px_6px_0px_black] p-6 flex flex-col items-center hover:scale-105 hover:rotate-1 transition-transform">
      <h3 className="text-4xl font-extrabold text-black drop-shadow-sm">
        {totalLikes}
      </h3>
      <p className="mt-2 text-lg font-semibold text-purple-700">Likes</p>
    </div>
  </div>
</div>

    </div>
  );
}

export default ChannelProfiles;

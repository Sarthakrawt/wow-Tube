import React, { useEffect, useState, useCallback } from 'react';
import { getVideoById, toggleSubscription, checkSubscription, toggleLike, getAllLikedVideos, getChannelSubscribers, getAllLikesOnVideo, getAllPlaylist, authUser, addVideotoPlaylist, addToWatchHistory, addVideoView } from '../lib/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import  Comment  from '../component/Comment.jsx';
function IndivisualChannel() {
  const videoID = useSelector(state => state.video.videoId);
  const [videoPath, setVideoPath] = useState("");
  const [inVideo, setVideo] = useState({});
  const [subscribed, setSubscribed] = useState(false);
  const [user, setUser] = useState(""); 
  const [avatarImg, setAvatarImg] = useState(null);
  const [username, setUsername] = useState("");
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [playlist, setPlayList] = useState([]);
  const [visible, setVisible] =useState(false);
  useEffect(() => {
    async function fetchVideo() {
      if (!videoID) return;
      try {
        const res = await getVideoById(videoID._id);
        if (res?.data?.videoFile) {
          setVideoPath((res.data.videoFile).replace("public", "").replace(/\\/g, "/"));
          setVideo(res.data);
        }
        setUser(res.data.owner._id);
        setAvatarImg(res.data.owner.avatar);
        setUsername(res.data.owner.username)
        const checkRes = await checkSubscription(res.data.owner._id);
        setSubscribed(checkRes?.data?.subscribed || false);
        console.log("fetching subscriber",checkRes)
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    }
    fetchVideo();
  }, [videoID]);

  useEffect(() => {
    async function fetchAllLikes() {
      if (!videoID) return;
      const res = await getAllLikedVideos(videoID._id);
      setLike(res?.data?.[0]?.video || false);
    }
    fetchAllLikes();
  }, [videoID]);

  const subscribe = useCallback(async function (channelId) {
    try {
      await toggleSubscription(channelId);
      setSubscribed(prev => !prev);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  }, []);

  const liked = useCallback(async function (videoId) {
    try {
      await toggleLike(videoId);
      setLike(prev => !prev);
    } catch (error) {
      console.error("Error liking video:", error);
    }
  }, []);

  useEffect(() => {
    async function getSubscribers() {
      try {
        if (!user) return;
        await getChannelSubscribers(user);
      } catch (error) {
        console.error(error);
      }
    }
    getSubscribers();
  }, [user]);

  useEffect(() => {
    async function updateLikeCount() {
      if (!videoID || !videoID._id) return;
      const res = await getAllLikesOnVideo(videoID._id);
      setCountLike(res?.data?.length || 0);
    }
    updateLikeCount();
  }, [videoID, like]);

  const getPlayList = async()=>{
    try {
      const res = await authUser();
      console.log("user data",res.data._id);

      let res2;
      if(res){
         res2 = await getAllPlaylist(res.data._id);
        }
        console.log("playList data ",res2.data)
    setPlayList(res2?.data);
    setVisible(prev => !prev)

    } catch (error) {
      console.log("Error at get PlayList", error)
    }
  }
  const videoPlayList  = async(videoId , playListId)=>{
    try {
       const res = await addVideotoPlaylist(videoId, playListId);
       console.log("videoPlaylist added",res)
    } catch (error) {

      console.log("Error at videoPlaylist" ,error)
    }
  };
  useEffect(()=>{
    async function addtoHistory(){
     addToWatchHistory(videoID._id);
     addVideoView(videoID._id)
    }
    if(videoID) addtoHistory();
  },[videoID])

  return (
    <div className="w-screen min-h-screen flex justify-center items-center p-8 bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-300 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');
          .font-heading { font-family: 'Fredoka One', cursive; }
          .font-body { font-family: 'Quicksand', sans-serif; }
        `}
      </style>
      {videoPath ? (
        <div className="w-full max-w-4xl flex flex-col bg-white rounded-3xl shadow-[6px_6px_0px_black] border-[4px] border-black p-6 gap-6">
          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden border-[4px] border-black shadow-[4px_4px_0px_black]">
            <video
              className="w-full h-auto bg-black rounded-xl"
              controls
              src={`http://localhost:8000/${videoPath}`}
            />
          </div>

          {/* User and interaction section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <Link to="/channel-profile">
                <img
                  className="w-16 h-16 rounded-full border-[3px]  object-cover bg-pink-200 border-black shadow-[3px_3px_0px_black] hover:scale-110 transition-transform active:translate-x-1 active:shadow-[1px_1px_0px_black]"
                  src={avatarImg || 'https://via.placeholder.com/80/FFA07A/FFFFFF?text=Avatar'}
                  alt="Channel Avatar"
                />
              </Link>
              <span className="text-xl font-heading text-gray-900 tracking-wide">{username}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-full font-heading text-lg transition-all hover:scale-110 border-[3px] border-black shadow-[3px_3px_0px_black] bg-white active:translate-y-1 active:shadow-[1px_1px_0px_black]"
                onClick={() => liked(videoID._id)}
              >
                {like ? (
                  <span className="text-2xl">❤️</span>
                ) : (
                  <span className="text-2xl">🤍</span>
                )}
                <span className="text-lg font-body text-gray-800">{countLike}</span>
              </button>
              <button
                className="text-lg font-heading bg-yellow-300 border-[3px] border-black rounded-full 
                          px-6 py-2 shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-yellow-400 
                          active:translate-y-1 active:shadow-[1px_1px_0px_black] transition-all"
                onClick={() => {
                  getPlayList();
                }}
              >
                💾 Save
              </button>
              <button
                className={`px-6 py-2 rounded-full font-heading transition-all hover:scale-110 shadow-[3px_3px_0px_black] border-[3px] border-black text-white text-lg active:translate-y-1 active:shadow-[1px_1px_0px_black]
                  ${subscribed ? "bg-red-500" : "bg-green-500"}`}
                onClick={() => subscribe(user)}
              >
                {subscribed ? "Subscribed ✅" : "Subscribe 🎉"}
              </button>
            </div>
          </div>
          {
  !visible ? null : (
    <div className="w-56 bg-pink-100 border-[3px] border-black rounded-2xl p-4 shadow-[6px_6px_0px_black]">
      <h2 className="text-lg font-heading text-gray-900 mb-3 flex items-center gap-2">
        🎶 Choose Playlist
      </h2>

      {playlist.length > 0 ? (
        playlist.map((val, indx) => (
          <div
            key={indx}
            className="flex justify-between items-center mb-3 bg-yellow-200 
                       border-[2px] border-black rounded-xl px-3 py-2 
                       shadow-[3px_3px_0px_black]"
          >
            <h1 className="font-body text-gray-900">{val.name}</h1>
            <button
              onClick={() => videoPlayList(videoID._id, val._id)}
              className="px-3 py-1 bg-green-300 border-[2px] border-black rounded-full 
                         shadow-[2px_2px_0px_black] hover:scale-110 transition-transform 
                         active:translate-y-1 active:shadow-[1px_1px_0px_black]"
            >
              ➕ Add
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-700 font-body">No playlists found</p>
      )}
    </div>
  )
}

          {/* Description section */}
          <div className="p-5 bg-yellow-100 rounded-2xl border-[3px] border-black shadow-[3px_3px_0px_black]">
            <h1 className="text-2xl font-heading text-gray-900 mb-2">📜 Description</h1>
            <p className="text-gray-800 font-body leading-relaxed">{inVideo.description}</p>
          </div>
           <Comment  videoId={videoID._id}/>
        </div>
      ) : (
        <p className="text-xl font-heading text-white">Loading video... ⏳</p>
      )}
    </div>
  );
}

export default IndivisualChannel;

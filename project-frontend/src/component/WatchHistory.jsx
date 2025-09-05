import React, { useEffect, useState } from "react";
import { deleteVideoWatchHistory, getUserWatchHistory } from "../lib/api";
import { useDispatch } from "react-redux";
import { addVideo } from "../store/videoSlice";
import { useNavigate } from "react-router";
import Profile from "./Profile";

function WatchHistory() {
  const [videos, setVideos] = useState([]);
  const [count , setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function UserHistory() {
      try {
        const res = await getUserWatchHistory();
        if (res?.data) {
          setVideos(res.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      }
    }
    UserHistory();
  }, [count]);
 const deleteHistory = async(videoId)=>{
  await deleteVideoWatchHistory(videoId);
  setCount(count + 1)
 }
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 font-[Quicksand] p-8">
        <div className="flex flex-row justify-between">
            <h1 className="text-4xl font-[Fredoka_One] text-pink-700 mb-8 text-center drop-shadow-[3px_3px_0px_black]">
        📺 Your Watch History
      </h1>
       <div className="text-gray-900 font-extrabold text-3xl pr-5  hover:scale-120 cursor-pointer" onClick={()=>navigate("/home")}> &#10006;</div>
        </div>
      
      
      {!loading && videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video, indx) => (
            <div
              key={indx}
              className="bg-white border-4 border-black rounded-2xl shadow-[5px_5px_0px_black] hover:scale-[1.03] transition-transform duration-300 overflow-hidden cursor-pointer"
            
            >
              {/* Thumbnail */}
              <img
                className="h-48 w-full object-cover border-b-4 border-black"
                src={video.thumbnail}
                alt="no thumbnail"
                  onClick={() => {
                dispatch(addVideo({ videoId: video }));
                navigate("/video");
              }}
              />

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-5 mb-3">
                  <img
                    className="h-12 w-12 rounded-full border-2 object-cover border-black shadow-[2px_2px_0px_black]"
                    src={video.owner?.[0]?.avatar}
                    alt="owner avatar"
                  />
                  <h2 className="font-[Fredoka_One] text-lg text-gray-900 truncate">
                    {video.title}
                  </h2>
                </div>
                <p className="text-sm font-[Quicksand] text-gray-700 line-clamp-2">
                  {video.description || "No description available"}
                </p>
                 <button className="sticky left-full w-10 hover:transition hover:scale-150  hover:duration-200 hover:delay-100 font-bold" onClick={()=>{deleteHistory(video._id)}}>X</button>
              </div>
             
            </div>
        
          ))}
          
        </div>
      ) : !loading && videos.length === 0 ? (
        <div className="text-center text-2xl font-[Fredoka_One] text-gray-600 mt-20">
          😔 No watch history yet
        </div>
      ) : (
        <div className="text-center text-xl font-[Fredoka_One] text-gray-600 mt-20 animate-pulse">
          Loading your history...
        </div>
      )}
      <div className="sticky top-full ">
          <Profile/>
      </div>
        
    </div>
  );
}

export default WatchHistory;

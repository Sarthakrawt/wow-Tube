import React, { useEffect, useState } from "react";
import { getAllPlaylist, getVideoById } from "../lib/api";
import { useDispatch } from "react-redux";
import { addVideo } from "../store/videoSlice";
import { useNavigate } from "react-router";

function PlayListpage() {
  const [playlist, setPlaylist] = useState([]);
  const [videos, setVideos] = useState([]);
  const [actualVideos, setActualVideos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchuser() {
        const res2 = await getAllPlaylist();
        setPlaylist(res2.data);
        // collect all videos
        const allVideos = res2.data.flatMap((pl) => pl.videos);
        setVideos(allVideos);
    }
    fetchuser();
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      const fetched = [];
      for (let videoId of videos) {
        const res = await getVideoById(videoId);
        fetched.push(res.data);
      }
      setActualVideos(fetched);
    }
    if (videos.length) fetchVideos();
  }, [videos]);

  return (

    <div className="w-screen min-h-screen bg-gradient-to-br from-yellow200 via-pink-200 to-sky-200 font-[Quicksand] p-6">
      <div className="w-full flex flex-wrap px-6 py-4 items-center sticky top-0 z-10 justify-between 
                            bg-gradient-to-r from-blue-300 via-red-200 to-orange-300 
                            border-b-4 border-black rounded-b-2xl shadow-[4px_4px_0px_black] mb-10">
                <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition" onClick={()=>navigate("/home")}>
                    <img className="w-14 h-14 drop-shadow-[3px_3px_0px_black]" src="../galaxy.png" alt="logo" />
                    <h1 className="font-[Fredoka_One] text-pink-700 text-2xl font-extrabold">WowTube</h1>
                </div>
                </div>
      {playlist.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-600 text-2xl font-[Fredoka_One]">
          No playlists 😔
        </div>
      ) : (
        playlist.map((value, indx) => (
          <div
            key={indx}
            className="mb-8 p-6 bg-gray-200 rounded-2xl border-4 border-black shadow-[6px_6px_0px_black]"
          >
            {/* Playlist Info */}
            <h1 className="text-3xl font-[Fredoka_One] text-pink-700 mb-2 drop-shadow-[2px_2px_0px_black]">
              🎵 {value.name}
            </h1>
            <h2 className="text-lg font-[Quicksand] text-gray-800 mb-4">
              {value.description}
            </h2>

            {/* Videos */}
            <div>
              {actualVideos.length === 0 ? (
                <div className="text-gray-600 italic font-[Quicksand]">
                  No videos 📭
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {actualVideos.map((video, vidx) => (
                    <div
                      key={vidx}
                      className="bg-white border-4 border-black rounded-2xl shadow-[5px_5px_0px_black] hover:scale-[1.03] transition-transform duration-300 cursor-pointer overflow-hidden active:translate-y-1 active:shadow-[1px_1px_0px_black]"
                      onClick={() => {
                        dispatch(addVideo({ videoId: video }));
                        navigate("/video");
                      }}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title || "No thumbnail"}
                        className="w-full h-48 object-cover border-b-4 border-black"
                      />
                      <div className="p-4 bg-gradient-to-bl from-yellow-200 via-pink-200 to-sky-200">
                        <h3 className="font-[Fredoka_One] text-lg text-gray-900 truncate">
                          {video.title}
                        </h3>
                        <p className="text-sm font-[Quicksand] text-gray-700 mt-1 line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PlayListpage;

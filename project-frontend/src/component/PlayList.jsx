import React, { useRef } from "react";
import { newPlaylist } from "../lib/api.js";
import { useNavigate } from "react-router";

function PlayList() {
  const nameRef = useRef("");
  const descirptionRef = useRef("");
  const navigate = useNavigate();

  const addPlayList = async () => {
    try {
      const data = {
        name: nameRef.current.value,
        description: descirptionRef.current.value,
      };
      await newPlaylist(data);
      nameRef.current.value = "";
      descirptionRef.current.value = "";
    } catch (error) {
      console.log("Error at creating playList", error);
    }
  };

  return (
    <div className="w-screen  pt-20 bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 flex items-center justify-center font-[Quicksand] p-6">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-8 w-full max-w-md">
        <h1 className="text-3xl font-[Fredoka_One] text-pink-700 mb-6 text-center drop-shadow-[2px_2px_0px_black]">
          🎨 Create a New Playlist
        </h1>

        <div className="flex flex-col gap-4">
          {/* Playlist Name */}
          <label className="font-[Fredoka_One] text-lg text-gray-900">
            📀 Playlist Name
          </label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter playlist name..."
            className="px-4 py-2 rounded-xl border-4 border-black bg-yellow-50 text-gray-900 shadow-[3px_3px_0px_black] focus:outline-none focus:ring-4 focus:ring-pink-400"
          />

          {/* Playlist Description */}
          <label className="font-[Fredoka_One] text-lg text-gray-900">
            📝 Description
          </label>
          <input
            ref={descirptionRef}
            type="text"
            placeholder="Enter description..."
            className="px-4 py-2 rounded-xl border-4 border-black bg-pink-50 text-gray-900 shadow-[3px_3px_0px_black] focus:outline-none focus:ring-4 focus:ring-yellow-400"
          />

          {/* Submit Button */}
          <button
            onClick={() => {
              addPlayList();
              navigate("/home");
            }}
            className="mt-6 bg-green-400 text-white px-6 py-3 rounded-xl border-4 border-black hover:bg-green-500 transition shadow-[4px_4px_0px_black] font-[Fredoka_One] text-lg"
          >
            🚀 Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayList;

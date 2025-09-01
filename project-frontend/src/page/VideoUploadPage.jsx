import React, { useRef } from 'react';
import { uploadVideo } from '../lib/api';

function VideoUploadPage() {
  const titleRef = useRef('');
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);
  const descriptionRef = useRef('');

  const handleVideoInfo = async () => {
    try {
      const formdata = new FormData();
      formdata.append("title", titleRef.current.value);
      formdata.append("videoFile", videoRef.current.files[0]);
      formdata.append("thumbnail", thumbnailRef.current.files[0]);
      formdata.append("description", descriptionRef.current.value);

      const resData = await uploadVideo(formdata);
      console.log(resData);
      console.log("successfully uploaded")
      titleRef.current.value = "";
      videoRef.current.value = "";
      thumbnailRef.current.value = "";
      descriptionRef.current.value = "";
    } catch (error) {
      console.log("Error at uploading info of video", error);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-br from-pink-200 via-yellow-200 to-green-200 px-4">
      <div className="flex flex-col w-full max-w-lg gap-6 bg-white p-6 rounded-2xl shadow-[5px_5px_0px_black] border-4 border-black">
        <h2 className="text-3xl font-extrabold text-center text-black drop-shadow-[2px_2px_0px_#facc15]">
          🎥 Upload a Video!
        </h2>

        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 font-bold text-black">✨ Title</label>
          <input
            type="text"
            ref={titleRef}
            placeholder="Enter video title"
            className="p-2 rounded-lg bg-yellow-100 border-2 border-black focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-200"
          />
        </div>

        {/* Video */}
        <div className="flex flex-col">
          <label className="mb-1 font-bold text-black">📼 Video File</label>
          <input
            type="file"
            ref={videoRef}
            className="bg-green-100 p-2 rounded-lg border-2 border-black focus:outline-none focus:ring-4 focus:ring-purple-400"
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col">
          <label className="mb-1 font-bold text-black">🖼️ Thumbnail</label>
          <input
            type="file"
            ref={thumbnailRef}
            className="bg-blue-100 p-2 rounded-lg border-2 border-black focus:outline-none focus:ring-4 focus:ring-pink-300"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-bold text-black">📝 Description</label>
          <input
            type="text"
            ref={descriptionRef}
            placeholder="Enter description"
            className="p-2 rounded-lg bg-pink-100 border-2 border-black focus:outline-none focus:ring-4 focus:ring-green-400"
          />
        </div>

        {/* Button */}
        <button
          className="mt-4 bg-yellow-400 border-2 border-black hover:bg-yellow-300 text-black font-extrabold py-2 px-4 rounded-xl shadow-[3px_3px_0px_black] active:translate-y-1 active:shadow-none transition-all duration-150"
          onClick={handleVideoInfo}
        >
          🚀 Submit
        </button>
      </div>
    </div>
  );
}

export default VideoUploadPage;

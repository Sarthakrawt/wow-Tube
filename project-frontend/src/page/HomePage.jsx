import React, { useEffect, useCallback, useRef, useState } from 'react';
import { getVideos, logout } from '../lib/api';
import { useNavigate } from 'react-router';
import { addVideo } from '../store/videoSlice.js';
import { useDispatch } from 'react-redux';
import PlayList from '../component/PlayList.jsx';
import Profile from '../component/Profile.jsx';
import { Link } from 'react-router';
import Tweet from '../component/Tweet.jsx';

function HomePage() {
    const searchRef = useRef();
    const [allVideos, setVideos] = useState([]);
    const [isSortType, setIsSortType] = useState(false); 
    const [sortemj, setSortEmg] = useState('🌑');
    const [isSortBy, setIsSortBy] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [playList, setPlayList] = useState(false);
    const [visibleBtn, setvisibleBtn] = useState(false);
    const [othervisible, setOtherVisible] =useState(false);
   const [videoVisible , setVideoVisible] = useState(true);
    const handleDec = () => setIsSortType(prev => !prev);
   
    const searchQuery = useCallback(async () => {
        const query = searchRef.current.value;
        const res = await getVideos(`query=${query}`);
        if (res?.data?.videos) setVideos(res.data.videos);
    }, []);

    const sortQuery = useCallback(async () => {
        const sortType = isSortType ? 'asc' : 'desc';
        const sortBy = isSortBy;
        const params = [];
        if (sortBy) params.push(`sortBy=${sortBy}`);
        if (sortType) params.push(`sortType=${sortType}`);
        const queryString = params.join('&');
        const res = await getVideos(queryString);
        if (res?.data?.videos) setVideos(res.data.videos);
    }, [isSortBy, isSortType]);

    useEffect(() => {
        async function getAllVideos() {
            const res = await getVideos();
            if (res?.data?.videos) setVideos(res.data.videos);
           
        }
        getAllVideos();
    }, []);


    const logoutbtn = useCallback(async () => {
        try {
            await logout();
            window.location.href = "http://localhost:5173/login"
        } catch (error) {
            console.log(error);
        }
    }, []);
   
    return (
        <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 font-[Quicksand] animate-fadeIn">
            
            {/* Header */}
            <div className="w-full flex flex-wrap px-6 py-4 items-center sticky top-0 z-10 justify-between 
                            bg-gradient-to-r from-yellow-300 via-pink-200 to-orange-300 
                            border-b-4 border-black rounded-b-2xl shadow-[4px_4px_0px_black]">
                <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition" onClick={()=>navigate("/home")}>
                    <img className="w-14 h-14 drop-shadow-[3px_3px_0px_black]" src="../galaxy.png" alt="logo" />
                    <h1 className="font-[Fredoka_One] text-pink-700 text-2xl font-extrabold">WowTube</h1>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                    <input
                        ref={searchRef}
                        type="search"
                        placeholder="🔍 Search videos..."
                        className="px-4 py-2 ml-50 rounded-xl border-4 border-black bg-white w-140 text-gray-900 text-sm 
                                   shadow-[3px_3px_0px_black] font-[Quicksand] 
                                   focus:outline-none focus:ring-4 focus:ring-pink-400 focus:scale-105 transition"
                    />
                    <button
                        onClick={searchQuery}
                        className="bg-pink-500 text-white px-4 py-2 rounded-xl border-4 border-black 
                                   hover:bg-pink-600 hover:rotate-2 hover:scale-105 transition 
                                   shadow-[3px_3px_0px_black] font-[Fredoka_One] active:translate-y-1 active:shadow-[1px_1px_0px_black]"
                    >
                        Go!
                    </button>
                </div>

               <button onClick={()=>setvisibleBtn(prev => !prev)} className='bg-purple-500 text-white px-4 py-2 rounded-xl border-4 border-black hover:bg-purple-600 hover:scale-105 transition 
               shadow-[3px_3px_0px_black] font-[Fredoka_One] active:translate-y-1 active:shadow-[1px_1px_0px_black] ml-40'>filter</button>
               
                {/* Buttons */}
                <div className="flex gap-3">
                   
                    <button onClick={()=>{setOtherVisible(prev => !prev)}} className='text-4xl mr-10 hover:scale-120 active:scale-95'>☰</button>
                   
                </div>
            </div>
             {/* Sorting */}
             <div className=' mt-4 flex flex-row justify-center items-center gap-30 w-full h-10 '>
                <button className='h-10 w-50 shadow-[6px_6px_0px_black] rounded-2xl bg-purple-500/20 hover:scale-110 active:shadow-[1px_1px_0px_black] border-4 border-black active:translate-y-2' onClick={()=>{setVideoVisible(false)}}>tweets</button>
                <button  className='h-10 w-50 shadow-[6px_6px_0px_black] border-4 border-black bg-purple-500/20  rounded-2xl hover:scale-110 active:shadow-[1px_1px_0px_black] active:translate-y-2' onClick={()=>{setVideoVisible(true)}}>videos</button>
             </div>
                <div className={visibleBtn?"flex flex-row items-center gap-4 font-[Quicksand] fixed w-130  border-6 border-solid border-black rounded-2xl h-40  top-25 bg-white/30 backdrop-blur-md right-10 left-200 z-1 justify-center": "hidden"}>
                    <label className="font-bold text-gray-900">Sort By:</label>
                    <select
                        onChange={(e) => setIsSortBy(e.target.value)}
                        defaultValue=""
                        className="px-3 py-2 rounded-xl border-4 border-black bg-white text-gray-800 text-sm 
                                   shadow-[2px_2px_0px_black] hover:scale-105 transition"
                    >
                        <option value="" disabled>Select</option>
                        <option value="title">Title</option>
                        <option value="description">Description</option>
                        <option value="createdAt">Created At</option>
                        <option value="views">Views</option>
                    </select>

                    <label className="font-bold text-gray-900">Asc:</label>
                    <input
                        type="checkbox"
                        checked={isSortType}
                        onChange={handleDec}
                        className="w-6 h-6 cursor-pointer accent-green-500 hover:scale-110 transition"
                    />

                    <button
                        onClick={() => { sortQuery(); setSortEmg("🌕"); }}
                        onMouseEnter={() => setSortEmg("🌗")}
                        onMouseLeave={() => setSortEmg("🌑")}
                        className="bg-green-500 text-white px-3 py-2 rounded-xl border-4 border-black 
                                   hover:bg-green-600 hover:scale-105 transition 
                                   shadow-[3px_3px_0px_black] font-[Fredoka_One] active:translate-x-1 active:shadow-[1px_1px_0px_black]"
                    >
                        <span className={`${sortemj === "🌕" ? "animate-spin-slow" : ""}`}>{sortemj}</span>
                    </button>
                </div>
                <div className={othervisible?"w-100 pr-20 pl-4 bg-white/30 backdrop-blur-md mt-24 h-screen fixed z-1 flex flex-col  items-center  ": "hidden"}>
                     <div
                        className=" w-full text-[17px] font-stretch-200% flex justify-center items-center h-15  font-extrabold mb-2  border-black border-4 rounded-md shadow-[6px_5px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]"
                        onClick={()=>navigate("/playlist")}
                    >
                       PlayList
                    </div>
                      
                    <div
                        className=" w-full text-[17px] font-stretch-200% flex justify-center items-center h-15 font-extrabold mb-2  border-black border-4 rounded-md shadow-[6px_5px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]"
                        onClick={()=>setPlayList(prev => !prev)}
                    >
                        +
                    </div>
                     <Link to="/watch-history" className=' w-full text-[17px] font-stretch-200% flex justify-center items-center  h-15 font-extrabold mb-2  border-black border-4 rounded-md shadow-[6px_5px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]'>history</Link>
                <Link to="/about" className=' w-full text-[17px] font-stretch-200% flex justify-center items-center  h-15 font-extrabold mb-2  border-black border-4 rounded-md shadow-[6px_5px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]'>about</Link>
              <Link
          className=" w-full text-[17px] font-stretch-200% flex justify-center items-center h-15 font-extrabold  mb-2 border-black border-4 rounded-md shadow-[6px_6px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]"
          to="/video-upload"
        >
          Upload Video 🎉
        </Link>
        <Link to="/tweet" className=' w-full text-[17px] font-stretch-200% flex justify-center  font-extrabold items-center h-15 mb-2  border-black border-4 rounded-md shadow-[6px_5px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]'>Tweet</Link>
         <div
                        className=" h-15 font-stretch-200% flex justify-center items-center mt-37 w-full font-extrabold border-black border-4 rounded-md shadow-[6px_6px_0px_black] hover:rotate-2 hover:scale-110 active:shadow-[3px_3px_0px_black]"
                        onClick={logoutbtn}
                    >
                        Logout
                    </div>
                </div>
            {/* Video Grid */}
            {!playList ? (
                <div className={videoVisible?"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8 animate-fadeUp":"hidden"}>
                    {allVideos.length === 0 ? (
                        <p className="text-xl font-bold text-center col-span-full text-gray-700 font-[Fredoka_One]">
                            No videos found 😔
                        </p>
                    ) : (
                        allVideos.map((video, indx) => (
                            <div
                                key={indx}
                                className="bg-white rounded-2xl border-4 border-black shadow-[5px_5px_0px_black] active:translate-y-1 active:shadow-[1px_1px_0px_black]
                                           hover:scale-[1.05] hover:rotate-1 transition-transform duration-300 
                                           cursor-pointer overflow-hidden animate-fadeUp"
                            >
                                <img
                                    src={video?.thumbnail || ""}
                                    className="h-48 w-full object-cover border-b-4 border-black"
                                    alt="video thumbnail"
                                    onClick={() => {
                                        dispatch(addVideo({ videoId: video }));
                                        navigate("/video");
                                    }}
                                />
                                <div className="p-4 flex flex-row gap-10">
                                    <img className="h-15 w-15 object-cover rounded-full border-4 hover:rotate-10 " src={video.owner.avatar} alt='no avatar' onClick={()=>{
                                       dispatch(addVideo({videoId: video}));
                                       navigate("/channel-profile")
                                    }} ></img>
                                    <div>
                                      <h2 className="text-lg font-[Fredoka_One] text-gray-900 truncate">
                                        {video.title}
                                    </h2>
                                    <div className='flex flex-row justify-center gap-10 mt-2 object-center'>
                                         <p className="font-bold text-gray-600  font-[Quicksand]">
                                      {video.owner.username} 
                                    </p>
                                         <p className="font-bold text-gray-600  font-[Quicksand]">
                                      {new Date(video.createdAt).toLocaleDateString()} 
                                    </p>
                                    <p className='font-extrabold text-sky-600 font-[Quicksand]'> 🤖 {video?.views?.length || 0}  views</p>
                                    </div>
                                   
                                    </div>
                                   
                                </div>
                            </div>
                        ))
                    )}
                
                </div>
                
            ) : (
                <PlayList/>
            )}
              {!videoVisible? <Tweet/>:<div></div>}
            {/* Floating Profile */}
            <Profile/>
        </div>
    );
}

export default HomePage;

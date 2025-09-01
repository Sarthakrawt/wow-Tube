import React, { useCallback, useEffect, useState } from 'react'
import { getAllLikes, getAllTweets, ToggleTweetLike } from '../lib/api'

function Tweet() {
    const [tweets, setTweets] = useState([]);
    const [likes, setLikes] = useState([]);
    const [count , setCount] = useState(0);
    useEffect(()=>{
        async function fetchTweets(){
        const res = await getAllTweets();
        console.log(res.data);
        if(res) setTweets(res.data);
        }
        fetchTweets();
    },[])

    useEffect(()=>{
        async function fetchLike(){
            const res = await getAllLikes();
          if(res) setLikes([...res.data]);
        }
        fetchLike();
    },[count])

    const toggleLike = async(tweetId)=>{
     const res = await ToggleTweetLike(tweetId)
     console.log("toggleLIke", res.data);
     if(res) setCount(count + 1);
    }

    const getlikes = useCallback((tweetId)=>{
   if(likes.length > 0){
    console.log(likes.some(like => like.tweet == tweetId))
    return likes.some( like => like.tweet == tweetId)
   }
    },[likes])
    return (
      <div className='w-screen min-h-screen pt-20 flex flex-col gap-10'>
    {
        tweets.length === 0 ?
            <div className="flex justify-center items-center h-full">no Tweets sorry</div>
            :
            tweets.map((tweet, indx) => (
                <div className='flex flex-col gap-10 border-2 p-12 justify-center w-1/2 h-1/2 bg-white/40 shadow-[10px_10px_0px_black] rounded-3xl mx-auto' key={indx}>
                    <div className='flex flex-row items-center gap-10 '>
                        <img src={tweet.owner.avatar} alt="no avatar" className='rounded-full w-20' />
                        <div>@{tweet.owner.username}</div>
                    </div>
                    <h1>{tweet.content}</h1>
                    <div>{new Date(tweet.createdAt).toLocaleDateString()}</div>
                    <button onClick={()=>toggleLike(tweet._id)}>{
                         getlikes(tweet._id)? (<div>liked</div>):(<div>like</div>)
                        }</button>
                </div>
            ))
    }
</div>
    )
}

export default Tweet;

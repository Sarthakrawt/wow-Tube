import React, { useEffect, useState, useRef, useCallback } from "react";
import { addComment, getAllLikes, getVideoComments, ToggleCommentLike } from "../lib/api";

function Comment({ videoId }) {
  const commentRef = useRef("");
  const [comments, setComments] = useState(null);
  const [count, setCount] = useState(0);
const [likeCount , setLikeCount] = useState(0);
const [likes, setLikes] = useState([]);
  const addBtn = async () => {
    const content = { content: commentRef.current.value };
    if (!content.content.trim()) return; // prevent empty comments
    await addComment(videoId, content);
    setCount((prev) => prev + 1);
    commentRef.current.value = "";
  };

  useEffect(() => {
    async function getComments() {
      const res = await getVideoComments(videoId);
      setComments([...res.data]);
    }
    if (videoId) getComments();
  }, [videoId, count]);
  useEffect(()=> { 
    async function FetchLikes(){
  const res1 = await getAllLikes();
    console.log("getLikes ",res1.data);
  if(res1) setLikes([...res1.data]);
  }
  FetchLikes();
},[likeCount])
  
  const likeToggle = async(commentId)=>{
   
    const res = await ToggleCommentLike(commentId);
    
    if(res){ 
    setLikeCount(likeCount+ 1);
    };
  }

  const fetchLike = useCallback((commentId)=>{
    if(likes.length> 0){
   return likes.some(like => 
    (like.comment) === commentId
  );
    }
    
  }
   
  ,[likes])

  console.log(fetchLike());
  
  return (
    <div className="mt-6 p-5 bg-pink-100 rounded-3xl border-[3px] border-black shadow-[5px_5px_0px_black]">
      {/* Header */}
      <h2 className="text-2xl font-heading text-gray-900 mb-4 drop-shadow-[2px_2px_0px_white]">
        💬 Comments
      </h2>

      {/* Input box */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Type your thoughts..."
          className="flex-1 px-4 py-2 rounded-full border-[3px] border-black shadow-[3px_3px_0px_black] 
                     focus:outline-none font-body bg-white"
          ref={commentRef}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-yellow-300 border-[3px] border-black rounded-full 
                     shadow-[3px_3px_0px_black] font-heading hover:scale-110 active:translate-y-1 active:shadow-[1px_1px_0px_black] 
                     transition-transform"
          onClick={(event) => {
            event.preventDefault();
            addBtn();
          }}
        >
          🚀 Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments?.map((comment, indx) => (
          <div
            key={indx}
            className="flex relative items-start gap-3 p-3 bg-white rounded-2xl border-[2px] border-black 
                       shadow-[3px_3px_0px_black] hover:scale-[1.02] transition-transform"
          >
            <img
              className="w-12 h-12 rounded-full border-[3px] border-black shadow-[2px_2px_0px_black]"
              src={comment.owner.avatar}
              alt="avatar"
            />
            <div>
              <p className="font-heading text-gray-900 text-lg">
                {comment.owner.username}
              </p>
              <p className="font-body text-gray-800">{comment.content}</p>
            </div>
          <div className="absolute top-2 right-4">
                  <button className="text-3xl hover:scale-120" onClick={()=>{likeToggle(comment._id)}}>
                  {
                    likes.length > 0?
                    (                    
                   fetchLike(comment._id) ? 
                       (<div>
                        liked
                       </div>)
                    :
                    (<div>unliked</div>)
                  )
                  : <div>Loading</div>}
                  </button>
              </div>
          </div>
        ))}

        {/* Empty state */}
        {comments?.length === 0 && (
          <p className="text-gray-700 font-heading text-center mt-4">
            😶 No comments yet. Be the first!
          </p>
        )}
      </div>
    </div>
  );
}

export default Comment;

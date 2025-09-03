import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"
import { Comment } from "../models/comment.model.js"
const toggleVideoLike = asyncHandler(async (req, res) => {
  try { const {videoId} = req.params
    //TODO: toggle like on video
    const video  = await Video.findOne({_id:videoId})
    const userId = req.user._id;
    if(!video){
        throw new ApiError(400, "the video doesnt exist")
    }
    console.log("working like button")
    const like = await Like.findOne({video: videoId,
        likedBy: userId,
    })
    if(like){
         await Like.deleteOne({video: videoId, likedBy: userId});
         return res.status(200).json(new ApiResponse(200,"like is deleted"))
    }
    else if(!like){
         const newLike  = new Like({
            video:videoId,
            likedBy: userId
        })
         await newLike.save();
         return res.status(200).json(new ApiResponse(200, newLike, "liked"))
    }}catch(error){
       console.log("Error occur at toggleVideoLike", error);
       res.status(500).json(new ApiError(500, "Error at toggleVideoLike"))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const userId = req.user._id;
    
    //TODO: toggle like on comment
    if(!commentId){
        throw new ApiError(401, "commentId does not exist")
    }
     const like = await Like.findOne({comment: commentId,
        likedBy: userId
     })
     if(like){
     await like.deleteOne();
        return res.status(200).json(new ApiResponse(200,null, "like has been deleted successfully"))
     }
    
        const newLike  = new Like({
            comment: commentId,
           likedBy: userId 
        })
        await newLike.save();
     
 return res
            .status(200)
            .json(new ApiResponse(200, newLike, "Like added successfully"));
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const userId =  req.user._id;
    if(!tweetId){
        throw new ApiError(401, "you need to give the tweet Id")
    }
    const like = await Like.findOne({
        tweet: tweetId,
        likedBy: userId
    });
    if(like){
        await like.deleteOne();
        return res.status(200).json(new ApiResponse(200, null, "tweet like deleted successfully"))
    }
    const newLike =  await Like.create({
        tweet: tweetId,
        likedBy: userId
    })
    
    return res.status(200).json(new ApiResponse(200, newLike , "tweet liked successful"))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
   const {videoId} = req.params;
   const userId = req.user._id;
    const allLikes = await Like.find({video: videoId, likedBy: userId});
    if(!allLikes){
     console.log("there no like in database yet")
     throw new ApiError(401, "there no like in DB yet")
    }
    return res.status(200)
    .json(new ApiResponse(200, allLikes, "fetched all likes"))
})

const getLikesOnVideo = asyncHandler(async(req, res)=>{
   try {
     const {videoId} = req.params;
     const allLikes = await Like.find({video: videoId}).populate("video", "title _id description");
     if(!allLikes){
    throw ApiError(404, "there is no like on this video")
     }
     return res.status(200)
     .json(new ApiResponse(200, allLikes, "all likes are fetched"))
   } catch (error) {
    console.log("eorror at getLikesOnVideo")
   }
})
const getLikesOnTweet = asyncHandler(async(req,res)=>{
 try{
  const {tweetId} = req.params;
  const tweetLike = await Like.findOne({tweet: tweetId})
  if(!tweetLike){
    throw new ApiError(400, "no likes on tweet")
  }
  return res.status(200)
  .json(new ApiResponse(200, tweetLike, "get all the likes on the tweet"))
 }catch(err){
    console.log("Error at getLikeOnTweets")
 }
})
const getAllLikes = asyncHandler(async(req,res)=>{
 try{
  
  const commentLike = await Like.find();
  if(!commentLike){
    throw new ApiError(400, "there is not Likes at all")
  }
  return res.status(200)
  .json(new ApiResponse(200, commentLike, "get all the likes on the tweet"))
 }catch(err){
    console.log("Error at getLikeOncomments", err)
 }
})
export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    getLikesOnVideo,
    getAllLikes,
    getLikesOnTweet,
}
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import mongoose from "mongoose";
const getChannelStats = asyncHandler(async(req, res)=>{
 const {userId} = req.params;
 const [ existingVideo, existingSubscriber] = await Promise.all([
  Video.find({ owner: userId}),
  Subscription.find({ channel: userId }).populate("subscriber","username _id")
]);
let existingLike;
for(let i = 0 ; i< existingVideo.length; i++){
existingLike = await Like.find({video:existingVideo[i]._id })
}

if(!existingLike){
throw ApiError(404, "there is no likes")
}
if(!existingVideo){
throw ApiError(404, "there is no Video")
}
if(!existingSubscriber){
throw ApiError(404, "there is no Subscriber")
}
return res.status(200)
.json(new ApiResponse(200, {existingSubscriber,existingLike, existingVideo}, "all status are returned of the user"))
})

const getChannelVideos = asyncHandler(async(req, res)=>{
const {userId} = req.params;
const videos = await Video.find({owner: userId}).populate("owner","username avatar coverImage")
if(videos.length === 0){
    throw new ApiError(404, "no videos found for this user")
}
if(!videos){
    return new ApiError(400, "getChannelVideos is giving the error")
}
return res.status(200)
.json(new ApiResponse(200, videos,"fetches user video successfully" ))
}
)


export {
    getChannelStats,
    getChannelVideos
}
import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
const getVideoComments = asyncHandler(async (req, res) => {
    const  {videoId}  = req.params
    const {page = 1, limit = 10} = req.query
   const video = await Video.findById(videoId);
   if(!video){
    throw new ApiError(404, "video not exist")
   }
  
   const comments = await Comment.aggregate([
        { $match: { video: new mongoose.Types.ObjectId(videoId) } }, 
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "owner", 
                foreignField: "_id",
                as: "owner"
            }
        },
        { $unwind: "$owner" },
        {
            $project: {
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                "owner.username": 1,
                "owner._id": 1,
                "owner.avatar": 1,
            }
        }
    ]);
   return res.status(200)
   .json(new ApiResponse(200, comments, "All comment on Video"))
})

const addComment = asyncHandler(async (req, res) => {
const userId = req.user._id;
const { content } = req.body;
const { videoId } = req.params;
const user = await User.findById(userId);
if(!user){
    throw new ApiError(400, null, "user is not exist ")
}
const video = await Video.findById(videoId);
if(!video){
    throw new ApiError(404, null, "video does'nt found")
}
const comment = await Comment.create({
    content: content,
    owner: userId,
    video: videoId,
})

return res.status(200).json(new ApiResponse(200,comment, "comment created successfully")) ;
})

const updateComment = asyncHandler(async (req, res) => {
   const {commentId} = req.params;
   const userId = req.user._id;
   const {content} = req.body;
   const comment  = await Comment.find(
    {
   $and:{ _id: commentId, owner: userId}
});
   if(!comment){
    throw new ApiError(404, "comment not found")
   }
   const updatedComment = await Comment.findByIdAndUpdate(commentId, 
    {$set: {"content": content}},{new: true}
   )
 return res.status(200)
 .json(new ApiResponse(200, updatedComment, "updated Successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const userId = req.user._id;
    const comment = await Comment.find({
        $and: {_id: commentId, owner: userId}
    })
    if(!comment){
        throw new ApiError(404, "comment not founded")
    }
    await Comment.findByIdAndDelete(commentId);
    return res.status(204)
    .json(new ApiResponse(204, null, "deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
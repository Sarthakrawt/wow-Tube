import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
   const userId  = req.user._id;
    const {content} = req.body;
    if(!content || content.length == 0){
        throw new ApiError(400, "content not be empty")
    }
    const tweet = await Tweet.create({
        owner: userId,
        content: content,
    })
    return res.status(200)
    .json(new ApiResponse(200, tweet , "tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const userId = req.user._id;
    const usersTweets = await Tweet.find({owner: userId}).populate("owner","_id avatar username")
    if(usersTweets.length === 0){
        throw new ApiError(400, "tweet does not exist of this user")
    }
   return res.status(200)
   .json(new ApiResponse(200, usersTweets, "gets all the userTweets"))
})

const getAllTweets = asyncHandler(async(req, res)=>{
 const AllTweets = await Tweet.find({}).populate("owner", "_id username avatar");
 return res.status(200)
 .json(new ApiResponse(200, AllTweets, "gets all the Tweets"))
})


const getChannelsTweet = asyncHandler(async(req, res)=>{
    const {userId} = req.params;
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(400, "there is not user Exist with this name")
    }
    const tweet = await Tweet.find({owner: userId});
    if(tweet.length === 0){
      throw new ApiError(400, "there is not tweet of this user")
    }
    return res.status(200)
    .json(new ApiResponse(200, tweet, "here is all the tweet of this user"))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params;
    const {updatedContent} = req.body;
    const userId = req.user._id;
    const tweet  = await Tweet.find({
        $and:{_id: tweetId,
            owner: userId
        }})
    if(!tweet){
        throw new ApiError(404, "tweet not founded")
    }
  const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, {
    $set: {content : updatedContent}
  }, {new: true})
 
  return res.status(200)
  .json(new ApiResponse(200, updatedTweet , "tweet is successfully updated"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params;
    const userId = req.user._id;
    const tweet  = await Tweet.findOne({
        $and:[{_id: tweetId},
        {owner: userId}
    ]})
         if(!tweet){
        throw new ApiError(404, "tweet not founded")
    }
    await tweet.deleteOne();
    return res.status(200)
    .json(new ApiResponse(200, "deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    getAllTweets,
    getChannelsTweet
}
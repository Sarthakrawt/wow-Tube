import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlists.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    const userId = req.user._id;
    if(!name || !description){
        throw new ApiError(404, "credential are not proivided")
        
    }
    //TODO: create playlist
    const playList = await Playlist.findOne({name, description})
   if(playList){
    throw new ApiError(406, "playList already existed")
  
   } 
   const newPlayList = new Playlist({
    name,
    description,
    owner: userId
   })
   await newPlayList.save();
   return res.status(200).json(new ApiResponse(200, newPlayList, "created playlist"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    
    const userId = req.user._id;
    console.log("it is geeting insdie the get playList",userId);
    //TODO: get user playlists
   const userPlayList = await Playlist.find({owner: userId});
   if(userPlayList.length == 0){
     throw new ApiError(404, "there is no playList of existnig user")
   }
   return res.status(200).json(new ApiResponse(200, userPlayList, "User playlists fetched"));
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404, "not found the playlist");
    }
    return res.status(200).json(new ApiResponse(200, playlist, "playlist is fetched by id"))

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    
    const {playlistId, videoId} = req.params
    console.log("playList and video Id ", playlistId, videoId);
    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(404, "video not found")
    }
    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404, "playlist not founded")
    }
    const updatedplaylist = await Playlist.findByIdAndUpdate(playlistId,
      { $addToSet: { videos: videoId } }, {new : true}
    ).populate("videos", "_id thumbnail owner title")

    return res.status(200).json(new ApiResponse(200,updatedplaylist, "video is added"))
})


const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const playlist = await Playlist.findById(playlistId)
    const video = await Video.findById(videoId)
    if(!playlist && !video){
        throw new ApiError(404 , "playlist or video not founded")
    }
     const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId,
         {
        $pull:{videos: videoId}}, {new: true})
    return res.status(200).json(new ApiResponse(200, updatedPlaylist, "remove the video deleted form playlist"))
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    
    // TODO: delete playlist
    const userId = req.user._id;
    const playList = await Playlist.findOne({
        $and: {
            _id : playlistId,
            owner: userId
        }
    })
    if(!playList){
        throw new ApiError(404 , "there is no playList existing in the database ")
    }
    await playList.delete();
    return res.status(200)
    .json(new ApiResponse(200, "deleted playlist successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {newname, newdescription} = req.body
    //TODO: update playlist
    const playList  = await Playlist.findById(playlistId);
    if(!playList){
        throw new ApiError(404, "playlist not founded")
    }
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, {
      $set: { name: newname,
        description:newdescription}
    },{new: true})

    return res.status(200, updatedPlaylist, "the playlist is updated")

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
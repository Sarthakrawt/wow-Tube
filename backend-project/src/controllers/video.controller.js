import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {updateCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js"
import { upload } from "../middlewares/multer.middleware.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType,userId } = req.query
    //TODO: get all videos based on query, sort, pagination
   
    
                // Define the match stage for filtering
        let matchStage = { $and: [] };

        if (query) {
        matchStage.$and.push({
            $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            ],
        });
        }

        if (userId) {
        matchStage.$and.push({ owner: new mongoose.Types.ObjectId(userId) });
        }

        // If no conditions added to $and, remove it to avoid empty $match
        if (matchStage.$and.length === 0) {
        matchStage = {};
        }
        // Define the sort stage
        const sortStage = {};
        if (sortBy && sortType) {
            sortStage[sortBy] = sortType === "asc" ? 1 : -1; // Sort by the specified field and order
        } else {
            sortStage.createdAt = -1; // Default sorting by createdAt in descending order
        }
    
        // Define the aggregation pipeline
        const videos = await Video.aggregate([
            { $match: matchStage }, // Filter videos
            { $sort: sortStage }, // Sort videos
            { $skip: (page - 1) * limit }, // Pagination: skip documents
            { $limit: parseInt(limit) }, // Pagination: limit documents
            {
                $lookup: { // Join with the User collection to get owner details
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                },
            },
            { $unwind: "$owner" }, // Unwind the owner array (since $lookup returns an array)
            {
                $project: { // Select fields to return
                    title: 1,
                    description: 1,
                    duration: 1,
                    views: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    videoFile:1,
                    thumbnail: 1,
                    "owner.username": 1,
                    "owner.fullName": 1,
                    "owner.avatar": 1,
                    "owner._id": 1,
                    "owner.coverImage": 1
                },
            },
        ]);
    
        // Get the total count of videos (for pagination metadata)
        const totalVideos = await Video.countDocuments(matchStage);
    
        // Return the response
        return res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            data: {
                videos,
                totalVideos,
                totalPages: Math.ceil(totalVideos / limit),
                currentPage: parseInt(page),
            },
        });
    });

    
    


const publishAVideo = asyncHandler(async (req, res) => {
   try {
     const { title, description} = req.body;
      const userVideo =  await Video.findOne({title, description})
      if(userVideo){
         throw new ApiError(400, "videoFile already existed")
      }
      const videoFilePath = await req.files?.videoFile[0]?.path;
      const thumbnailPath = await req.files?.thumbnail[0]?.path;
     
      if(!title || !description || !videoFilePath){
       throw new ApiError(400, "fields cannot be blank")
      }
     // TODO: get video, upload to cloudinary, create video
    
      if(!videoFilePath){
        throw new ApiError(400, "videoFile path is missing")
      }
     const uploadedThumbnail = thumbnailPath? await uploadOnCloudinary(thumbnailPath) : ""
    
     const newVideoFile = new Video({
        title, description,
         videoFile:videoFilePath,
          thumbnail: uploadedThumbnail?.url || "",
          thumbnailPublicId: uploadedThumbnail?.public_id || "",
           isPublished: true,
            owner : req.user._id
     })
     await newVideoFile.save()
    
     return res.status(200)
     .json(new ApiResponse(200, newVideoFile, "video info file created successfully"))
   } catch (error) {
    console.log("Error occur at publishAVideo" , error);
   }
})


const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: update video details like title, description, thumbnail
   const {title, description, thumbnail} = req.body;
   if(!(title || description || thumbnail)){
    throw new ApiError(400,"At least one field is required" )
   }
   const oldThumbnailPath = req.files.thumbnail[0].path;
   const updatedThumbnail = thumbnail? await updateCloudinary(oldThumbnailPath,thumbnail): "";
  if(!updatedThumbnail){
    throw new ApiError(400, "thumbnail is not updated")
  }
   const video = await Video.findByIdAndUpdate(videoId, {
    title, 
    description,
    thumbnail: updatedThumbnail.url,

   },{new: true})
  if(!video){
    throw new ApiError(404, "video does not exist")
  }
  return res.status(200).json(new ApiResponse(200, video, "updated successfully"))
})



const getVideoById = asyncHandler(async(req,res)=>{
    const {videoId}  = req.params;
    // for particular videos that you wnat to watch
    const video = await Video.findOne({_id : videoId}).populate("owner", "username avatar _id coverImage");
    if(!video){
        throw new ApiError(400, "videoId is incorrect");
    }
    return res.status(200)
    .json(new ApiResponse(200,video, "video is founded"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId  = req.user._id;
    const video = await Video.findOne({
        $and:[
            {_id:videoId},
            {owner: userId}
        ]
    });
    if(!video){
        throw new ApiError(404, "video not found ")
    }
      try {
    fs.unlink(video.filePath);
} catch (err) {
    console.warn("File already deleted or not found", err);
}
    await video.deleteOne();
    return res.status(200)
    .json(new ApiResponse(200, "video deleted"))

    //TODO: delete video
})

const addVideoView = asyncHandler(async (req, res) =>{
 const {videoId} = req.params
 const userId = req.user._id;
 const video = await Video.findById(videoId)
 if(!video){
    throw new ApiError(404, "Not found")
 }
   if (video.views.includes(userId)) {
    return res.status(200).json(
      new ApiResponse(200, video, "User already viewed this video")
    );
  }
  video.views.push(userId);
  await video.save();
 return res.status(200)
 .json(new ApiResponse(200, video, "view has been inserted to the video"));
})
export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    addVideoView
   
   
}
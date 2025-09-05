
import { axiosInstance, axiosInstanceComment, axiosInstanceDashboard, axiosInstancelike, axiosInstancePlaylist, axiosInstanceSub, axiosInstanceTweet, axiosInstanceVideo } from "./axios";



//user
async function login(userData){
 try {
   
   const res =  axiosInstance.post("/login",userData);
   localStorage.setItem("user", JSON.stringify(res.user))
   localStorage.setItem("token", res.token)
   return res.data;
 } catch (error) {
console.log("Error at time of login",error)
return null;
 }
}
async function signup(userData){
  try {
      const res = axiosInstance.post("/register",userData)
      return res.data;
  } catch (error) {
    console.log("Error at signup" , error);
  }
}
async function authUser(){
  try {
    const res = await axiosInstance.get("/current-user");
    console.log("get inside the authuser", res.data)
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
    // User not logged in, return null silently
    return null;
  }
    console.log("Error at getting user", error);
    return null
  }
}
async function getUserChannelProfile(username){
   try {
    const res = await axiosInstance.get(`/c/${username}`)
    return res.data;
   } catch (error) {
    console.log("error at getuserChannelProfile", error);
   }
}

async function logout(){
  try {
     const res = await axiosInstance.post(`/logout`)
     return res.data;
  } catch (error) {
    console.log("error at logout", error)
  }
}

    async function changePassword(updatePassword){
      try {
        const res = await axiosInstance.post("/change-password", updatePassword)
        return res.data;
      } catch (error) {
        console.log("Error at change Password",error);
      }
    }
    async function updateAccount(updateUser){
      try {
        const res = await axiosInstance.patch("/update-account",updateUser)
        return res.data;
      } catch (error) {
        console.log("Error at change Password",error);
      }
    }
    async function changeAvatar(updateAvatar){
      try {
        const res = await axiosInstance.patch("/avatar",updateAvatar)
        return res.data;
      } catch (error) {
        console.log("Error at change avatar Image",error);
      }
    }
    async function changeCoverImage(updateCoverImage){
      try {
        const res = await axiosInstance.patch("/cover-image",updateCoverImage)
        return res.data;
      } catch (error) {
        console.log("Error at change coverImage",error);
      }
    }
   
    async function getUserWatchHistory(){
     try {
       const res = await axiosInstance.get("/history");
       console.log("get watch histroy of user", res);
       return res.data;
     } catch (error) {
      console.log("Error at get watch history", error)
     }
    }
   
    async function addToWatchHistory(videoId){
      try {
        const res = await axiosInstance.patch(`add-to-watchHistory/${videoId}`);
        console.log("success fully added to watch history ",res.data);
      } catch (error) {
        console.log("Error at addTo watch History ", error)
      }
    }

    async function deleteVideoWatchHistory(videoId){
      try {
        const res = await axiosInstance.delete(`delete-video-watchHistory/${videoId}`);
        console.log("success fully deeted to watch history ");
      } catch (error) {
        console.log("Error at addTo watch History ", error)
      }
    }
 


// dashboard
async function getUsersChannelVideos(ownerId){
  try {
    const res = await axiosInstanceDashboard.get(`/videos/${ownerId}`);
    console.log("getUserVideos",res)
    return res.data;
  } catch (error) {
    console.log("Error at getUserChannelData",error);
  }
}

async function channelStates(userId){
  try{
    const res = await axiosInstanceDashboard.get(`/stats/${userId}`)
    return res.data;
  }catch(error){
    console.log("Error occur at chaneelStates: ", error);
  }
}

//video
async function uploadVideo(videoInfo){
  try {
    const res = await axiosInstanceVideo.post('/upload', videoInfo,
      { 
        headers: {
    "Content-Type": "multipart/form-data",
  }
 })
   console.log(res)
  } catch (error) {
    console.log("Error at uploadVideo", error)
  }
}

async function getVideos(filter){
 try{
  const res = await axiosInstanceVideo.get(`/get-allvideos?${filter}`);
  return res.data;
 }catch(error){
   console.log("Error at getVideos", error)
 }
}

async function getVideoById(videoId){
  const res = await axiosInstanceVideo.get(`/get-video/${videoId}`);
  return res.data;
}

async function addVideoView(videoId){
  const res = await axiosInstanceVideo.patch(`/add-view/${videoId}`)
  return res.data;
}



// subscription 
 async function toggleSubscription(channelId) {
  try {
    const res = await axiosInstanceSub.post(`/toggle/${channelId}`, null, {
      withCredentials: true, // important if you're using cookies
    });
    console.log("Toggle Subscription Response:", res.data);
    return res.data; // return only the data
  } catch (error) {
    console.error("Error in toggleSubscription:", error.response?.data || error.message);
    throw error; // you can handle this in your component
  }
}

 async function checkSubscription(channelId) {
  try {
    const res = await axiosInstanceSub.get(`/toggle/${channelId}`, {
      withCredentials: true,
    });
    // console.log("user subscriber" , res.data);
    return res.data; // { success: true, subscribed: true/false }
  } catch (error) {
    console.error("Error checking subscription:", error.response?.data || error.message);
    return { success: false, subscribed: false };
  }
}

async function getChannelSubscribers(channelId){
  try {
    console.log("this is the channelId",channelId)
    const res = await axiosInstanceSub.get(`/u/${channelId}`)
    console.log("get Channel Sbuscribers : ", res)
    return res.data;
  } catch (error) {
    console.log("Error at get ChannelSubscribers")
    throw error;
  }
}




//likes
async function toggleLike(videoId){
  try {
    const res = await axiosInstancelike.post(`/toggle/${videoId}`);
    console.log("liked" , res.data)
    return res.data;
  } catch (error) {
    console.log("Error occur at toogleLike:", error)
    return error;
  }
  
}
async function getAllLikedVideos(videoId){
  try {
    const res = await axiosInstancelike.get(`/get-likes/${videoId}`)
    return res.data;
  } catch (error) {
    console.log("Error occur at get likes" , error)
  }
}

async function getAllLikesOnVideo(videoId){
  try {
    const res = await axiosInstancelike.get(`/get-alllikes/${videoId}`)
    return res.data;
  } catch (error) {
    console.log("Error occurs at getAllLikesOnVideo", error)
  }
}
async function deleteUserVideo(videoId){
  try{
    const res  = await axiosInstanceVideo.delete(`/delete/${videoId}`);
    return res.data;
  }catch(error){
    console.log("Error at delete Video", error)
  }
}


async function ToggleCommentLike(commentId){
  const res = await axiosInstancelike.post(`/toggle/comment/${commentId}`)
  return res.data;
}

async function getAllLikes(){
  const res = await axiosInstancelike.get(`/get`);
  return res.data;
}
async function ToggleTweetLike(tweetId){
  const res = await axiosInstancelike.post(`/toggle/tweet/${tweetId}`)
  return res.data;
}



//playList

async function newPlaylist(playlist){
try {
   const res = await axiosInstancePlaylist.post("/",playlist);
   return res.data;
} catch (error) {
  console.log("error at newPlaylist", error)
}
}
async function getAllPlaylist(){
   const res = await axiosInstancePlaylist.get(`/user`);
   return res.data;
}
async function addVideotoPlaylist(videoId, playlistId){
 const res = await axiosInstancePlaylist.patch(`/add/${videoId}/${playlistId}`)
 return res.data;
}



//comment

async function getVideoComments(videoId){
try {
  const res = await axiosInstanceComment.get(`/get/${videoId}`);
  return res.data;
} catch (error) {
  console.log("Error at get Videos Comments ", error)
}
}

async function addComment(videoId, content){
try {
    const res = await axiosInstanceComment.post(`/add/${videoId}`,content);
    return res.data.message;
} catch (error) {
  console.log("Error at addComment", error)
}
}



//tweet

async function addTweet(content){
  try {
    const res = await axiosInstanceTweet.post("/add",content);
    return res;
  } catch (error) {
    console.log("Error at add tweet " ,error)
  }
}
async function getUserTweets(){
  try {
    const res = await axiosInstanceTweet.get("/get/user");
    return res.data;
  } catch (error) {
    console.log("Error at add tweet " ,error)
  }
}
async function getAllTweets(){
  try {
    const res = await axiosInstanceTweet.get("/get/all")
    return res.data;
  } catch (error) {
    console.log("Error at add tweet " ,error)
  }
}
async function deleteUserTweet(tweetId){
 try {
  const res = await axiosInstanceTweet.delete(`/delete/${tweetId}`);
  return res.data;
 } catch (error) {
  console.log("Error at delete User Tweet", error)
 };
}

async function getChannelTweets(userId){
  const res= await axiosInstanceTweet.get(`/user/${userId}`)
  return res.data;
}
export {
    signup,
     login,
     authUser,
     getUserChannelProfile,
     getUsersChannelVideos,
     uploadVideo,
     getVideos,
     logout,
     getVideoById,
     toggleSubscription,
     checkSubscription,
     toggleLike,
     getAllLikedVideos,
     getChannelSubscribers,
     getAllLikesOnVideo,
     channelStates,
     changeAvatar,
     changeCoverImage,
     changePassword,
     updateAccount,
     newPlaylist,
     getAllPlaylist,
     addVideotoPlaylist,
     getUserWatchHistory,
     addToWatchHistory,
     getVideoComments,
     addComment,
     addVideoView,
     addTweet,
     getAllTweets,
     getUserTweets,
     deleteUserTweet,
     deleteUserVideo,
     getChannelTweets,
     getAllLikes,
     ToggleTweetLike,
     ToggleCommentLike,
     deleteVideoWatchHistory
    }



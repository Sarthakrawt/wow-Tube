import { Router } from "express";
// Router is used to make routers like /api /about 
import {registerUser,
     loginUser,
      logoutUser, 
      refreshAccessToken,
      changeCurrentPassword,
      getCurrentUser,
      getUserWatchHistory,
      updateUserAvatar,
      updateAccountDetails,
      updateUserCoverImage,
      getUserChannelProfile,
      deleteCurrentUser,
      addWatchHistory,
      deleteVideoFromWatchHistory
    } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"


const router = Router()
// first to assign routers to router you need to use route method then if you router functionallity is in another folder you can use post and function name which is situated in differnet folder 

router.route("/register").post(
    upload.fields([
        {name : "avatar",
            maxCount: 1,
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(
    loginUser
)

// secured routes
router.route("/logout").post(
    verifyJWT,
    logoutUser
)

router.route("/refresh-token").post(
refreshAccessToken
)
router.route("/change-password").post(  
    verifyJWT,
    changeCurrentPassword
)

router.route("/current-user").get(
verifyJWT,
getCurrentUser
)

router.route("/update-account").patch(
    verifyJWT,
    updateAccountDetails
)

router.route("/avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)
router.route("/cover-image").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

router.route("/history").get(verifyJWT,getUserWatchHistory)

router.route("/deleteUser").post(verifyJWT, deleteCurrentUser)

router.route("/add-to-watchHistory/:videoId").patch(verifyJWT,addWatchHistory )

router.route("/delete-video-watchHistory/:videoId").delete(verifyJWT, deleteVideoFromWatchHistory)
export default router
//6879f3d3d91f3e5bc588f368
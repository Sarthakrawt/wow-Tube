import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getAllLikes, getLikedVideos, getLikesOnVideo, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";

const likeRouter = Router();
likeRouter.use(verifyJWT)
likeRouter.route("/get").get(getAllLikes);
likeRouter.route("/toggle/:videoId").post(toggleVideoLike)
likeRouter.route("/get-likes/:videoId").get(getLikedVideos)
likeRouter.route("/get-alllikes/:videoId").get(getLikesOnVideo)
likeRouter.route("/toggle/tweet/:tweetId").post(toggleTweetLike)
likeRouter.route("/toggle/comment/:commentId").post(toggleCommentLike)
export default likeRouter;
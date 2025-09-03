import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addVideoView, deleteVideo, getAllVideos, getVideoById, publishAVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const videoRouter = Router();
videoRouter.use(verifyJWT);
videoRouter.route("/upload").post(upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),publishAVideo);
videoRouter.route("/get-allvideos").get(getAllVideos);
videoRouter.route("/get-video/:videoId").get(getVideoById);
videoRouter.route("/add-view/:videoId").patch(addVideoView);
videoRouter.route("/delete/:videoId").delete(deleteVideo);
export default videoRouter;
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controller.js";
const commentRouter = Router();
commentRouter.use(verifyJWT)

commentRouter.route("/get/:videoId").get(getVideoComments);
commentRouter.route("/add/:videoId").post(addComment);
commentRouter.route("/delete/:commentId").delete(deleteComment);
commentRouter.route("/update/:commentId").patch(updateComment)

export  default commentRouter;
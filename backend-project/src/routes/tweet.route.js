import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getAllTweets, getChannelsTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";


const tweetRouter = Router();

tweetRouter.use(verifyJWT);
tweetRouter.route("/add").post(createTweet);
tweetRouter.route("/get/user").get(getUserTweets);
tweetRouter.route("/get/all").get(getAllTweets);
tweetRouter.route("update/:tweetId").patch(updateTweet)
tweetRouter.route("/delete/:tweetId").delete(deleteTweet);
tweetRouter.route("/user/:userId").get(getChannelsTweet)

export default tweetRouter;
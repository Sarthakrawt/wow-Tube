import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller.js";

const subscribeRouter =  Router();

subscribeRouter.use(verifyJWT);
subscribeRouter.route("/toggle/:channelId").get(getSubscribedChannels).post(toggleSubscription)
subscribeRouter.route("/u/:channelId").get(getUserChannelSubscribers);

export default subscribeRouter;
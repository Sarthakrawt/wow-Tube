import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscriptions.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
  try {
    const { channelId } = req.params;
    const userId = req.user._id;

    if (!channelId) {
      throw new ApiError(400, "Channel ID is required");
    }
   
    const existingSubscription = await Subscription.findOne({
      channel: channelId,
      subscriber: userId,
    });

    if (!existingSubscription) {
      const newSubscription = await Subscription.create({
        channel: channelId,
        subscriber: userId,
      });

      return res.status(200).json(
        new ApiResponse(200, newSubscription, "Subscribed successfully")
      );
    } else {
      await Subscription.deleteOne({
        channel: channelId,
        subscriber: userId,
      });

      return res.status(200).json(
        new ApiResponse(200, null, "Unsubscribed successfully")
      );
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error at toggleSubscription"));
  }
});


// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;

   const subscription = await Subscription.find({
    channel : channelId,
   }).populate("subscriber", "username email")
  if(!subscription){
    throw new ApiError(404, "there is no subscription")
  }
  return  res.status(200)
  .json(new ApiResponse(200, subscription, "subscription fetch successfully"))
})

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { channelId } = req.params;

  const isSubscribed = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  }).populate("channel", "username email");

  if (!isSubscribed) {
    return res.status(200).json(
      new ApiResponse(200, { subscribed: false }, "Not subscribed")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, { subscribed: true }, "Subscribed")
  );
});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
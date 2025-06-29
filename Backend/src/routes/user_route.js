import express from "express";
import { protectRoute } from "../middleware/auth.midddleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getRecommendedUsers,
  getMyFriends,
  getMyFriendRequests,
  getOutgoingFriendRequests,
  rejectFriendRequest,
  unFriend
} from "../controllers/user_controller.js";

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-request", getMyFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

router.put("/friend-request/:id/reject", rejectFriendRequest);
router.put("/friend-request/:id/unfriend", unFriend);

export default router;

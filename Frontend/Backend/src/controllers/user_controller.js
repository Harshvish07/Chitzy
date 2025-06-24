import User from "../model/User.js";
import FriendRequest from "../model/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommmendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude the current user
        { _id: { $nin: currentUser.friends } }, // Exclude friends of the current user
        { isOnboarded: true }
      ]
    });
    res.status(200).json(recommmendedUser);
  } catch (error) {
    console.log("Error in getRecommendedUsers:", error.message);
    res.status(500).json({ message: " internal Server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePicture nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends:", error.message);
    res.status(500).json({ message: " internal Server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recepientId } = req.params;

    // prevent sending friend request to yourself
    if (myId === recepientId) {
      return res
        .status(400)
        .json({ message: "You cannot send friend request to yourself" });
    }

    const recipient = await User.findById(recepientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // check if user is already friend exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recepientId },
        { sender: recepientId, recipient: myId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recepientId
    });

    res.status(200).json({ friendRequest });
  } catch (error) {
    console.log("Error in sendFriendRequest:", error.message);
    res.status(500).json({ message: " internal Server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    // verify the current user is the recipient of the friend request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        message: "You are not authorized to accept this friend request"
      });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to each other's friend list
    // $addToSet: add elements to an array field only if they are not already present
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.log("Error in acceptFriendRequest:", error.message);
    res.status(500).json({ message: " internal Server error" });
  }
}

export async function getMyFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending"
    }).populate(
      "sender",
      "fullName profilePicture nativeLanguage learningLanguage"
    );

    const acceptedRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted"
    }).populate("sender", "fullName profilePicture ");

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.log("Error in getMyFriendRequests:", error.message);
    res.status(500).json({ message: " internal Server error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending"
    }).populate(
      "recipient",
      "fullName profilePicture nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendRequests:", error.message);
    res.status(500).json({ message: " internal Server error" });
  }
}

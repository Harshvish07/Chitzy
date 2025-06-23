// import { StreamChat } from "stream-chat";
// import "dotenv/config";

// const apikey = process.env.STREAM_API_KEY;
// const apiSecret = process.env.STREAM_API_SECRET;

// if (!apikey || !apiSecret) {
//   console.log("stream api key or secret is missing");
// }

// const steamClient = StreamChat.getInstance(apikey, apiSecret);

// export const upsertcreateStreamUser = async (userData) => {
//   try {
//     await steamClient.upsertUsers([userData]);
//     return userData;
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// };

import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};
export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};

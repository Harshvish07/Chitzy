import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import ConfirmationDialog from "./ConfirmationDialog";
import { useState } from "react";

const FriendCard = ({ friend, handleUnFriend }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [friendId, setFriendId] = useState(null);
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePicture} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
          <button
            className="btn btn-sm btn-error ml-auto rounded-lg"
            onClick={() => {
              setFriendId(friend._id);
              setDialogOpen(true);
            }}
          >
            UnFriend
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        onConfirm={handleUnFriend}
        title="Are you sure you want to unFriend?"
        confirmText="UnFriend"
        cancelText="Cancel"
        theme="bg-neutral text-neutral-content"
      />
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}

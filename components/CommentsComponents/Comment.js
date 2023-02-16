import { Tooltip } from "@nextui-org/react";
import { format, formatDistanceToNow } from "date-fns";
import React from "react";
import ReplySVG from "../../assets/icons/reply.svg";
import CommentList from "./CommentList";
function Comment({ comment, token, complaintId }) {
  const [showReplies, setShowReplies] = React.useState(false);
  const comment_created_at = new Date(comment.created_at);

  return (
    <div className="break-all">
      <div
        id={comment.id}
        className="bg-zinc-300 flex flex-col p-2 rounded-md shadow-md target:ring-2 target:ring-zinc-600 target:bg-zinc-50"
      >
        <div className="flex font-mono text-xs text-zinc-900">
          <p className="flex-1">@{comment.username}</p>
          <Tooltip
            placement="left"
            content={format(comment_created_at, "dd MMM yyyy hh:mm a")}
          >
            <p className="font-sm">
              {formatDistanceToNow(comment_created_at, { addSuffix: true })}
            </p>
          </Tooltip>
        </div>
        <p className="pl-1 text-sm font-semibold ">{comment.comment_text}</p>
        <div className="ml-auto px-3">
          <button onClick={() => setShowReplies(!showReplies)}>
            <ReplySVG className="fill-current h-4 w-4" />
          </button>
        </div>
      </div>
      {showReplies && (
        <CommentList
          complaintId={complaintId}
          parent_comment_id={comment.id}
          token={token}
        />
      )}
    </div>
  );
}

export default Comment;

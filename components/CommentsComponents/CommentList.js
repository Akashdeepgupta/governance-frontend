import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import SendSVG from "../../assets/icons/send.svg";
import BACKEND_URL from "../../utils";
import Comment from "./Comment";
function CommentList({ complaintId, parent_comment_id, token }) {
  const router = useRouter();
  const [commentsList, setCommentsList] = React.useState([]);
  const [commentToggle, setCommentToggle] = React.useState(false);
  const commentRef = React.useRef();
  var url;
  if (parent_comment_id)
    url = `${BACKEND_URL}complaints/${complaintId}/comments?parent_comment_id=${parent_comment_id}`;
  else url = `${BACKEND_URL}complaints/${complaintId}/comments`;
  const currentPath = router.asPath.split("#")[0];

  React.useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(url);
      const data = await response.data;
      setCommentsList(data);
    };
    fetchComments();
  }, [complaintId]);

  const handleCreateComment = async (
    comment_text,
    token,
    parent_comment_id,
    complaint_id
  ) => {
    const url = `${BACKEND_URL}/complaints/${complaint_id}/comments/`;
    const response = await axios
      .post(
        url,
        {
          comment_text,
          parent_comment_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  };

  return (
    <div
      className={`${
        parent_comment_id &&
        "ml-2 border-l-2 hover:border-zinc-600 border-zinc-300"
      }`}
    >
      <div className="flex flex-col gap-4 ml-2">
        {commentsList.length ? (
          commentsList.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                token={token}
                complaintId={complaintId}
              />
            );
          })
        ) : (
          <div className="font-medium text-sm text-center">
            ...No replies...
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentList;

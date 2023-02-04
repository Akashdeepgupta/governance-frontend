import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import DownvoteSVG from "../../assets/icons/downvote.svg";
import { fetchVoteCount, handleVote } from "../../utils";
function Downvote({
  setVote,
  setLikeCount,
  ComplaintId,
  token,
  vote,
  placement,
}) {
  const router = useRouter();
  return (
    <Tooltip content={"Downvote"} placement={placement}>
      <DownvoteSVG
        // onClick={async () => {
        //   var resp;
        //   if (vote === -1) {
        //     resp = await handleVote(ComplaintId, token, 0);
        //     if (resp.status === 401) {
        //       router.push("/auth/login");
        //     } else if (resp.status === 200) {
        //       setVote(resp.data.vote);
        //     }
        //   } else {
        //     resp = await handleVote(ComplaintId, token, -1);
        //     if (resp.status === 401) {
        //       router.push("/auth/login");
        //     } else if (resp.status === 200) {
        //       setVote(resp.data.vote);
        //     }
        //   }
        //   const voteCount = await fetchVoteCount(ComplaintId);
        //   setLikeCount(voteCount);
        // }}
        className={vote == -1 ? "fill-orange-600" : "fill-slate-500"}
      />
    </Tooltip>
  );
}

export default Downvote;

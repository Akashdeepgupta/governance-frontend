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
        className={vote == -1 ? "fill-orange-600" : "fill-slate-500"}
      />
    </Tooltip>
  );
}

export default Downvote;

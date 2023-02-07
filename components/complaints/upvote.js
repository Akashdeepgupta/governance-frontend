import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

import UpvoteSVG from "../../assets/icons/upvote.svg";
import { fetchVoteCount, handleVote } from "../../utils";
function Upvote({ setVote, setLikeCount, ComplaintId, token, vote }) {
  const router = useRouter();
  return (
    <Tooltip content={"Upvote"}>
      <UpvoteSVG
        className={vote == 1 ? "fill-orange-600" : "fill-slate-500"}
      />
    </Tooltip>
  );
}

export default Upvote;

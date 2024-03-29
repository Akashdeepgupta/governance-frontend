import React from "react";
import { useRouter } from "next/router";
import { Tooltip } from "@nextui-org/react";
import UpvoteSVG from "../../assets/icons/upvote.svg";
import DownvoteSVG from "../../assets/icons/downvote.svg";
import ShareCard from "../shareCard";
import Share from "../../assets/icons/share.svg";
function UpvoteDownvoteShare({ complaintData }) {
  const router = useRouter();
  return (
      <div className="flex">
        <div className="flex gap-3 items-center">
        <Tooltip content={"Upvote"}>
          <UpvoteSVG className="fill-slate-500 " />
        </Tooltip>
        <p className="text-center text-sm font-semibold">
          {complaintData.like_count}
        </p>
        <Tooltip content={"Downvote"}>
          <DownvoteSVG className="fill-slate-500 " />
        </Tooltip>

        <div className="flex">
          <Tooltip
            content={
              <div className="flex gap-2">
                <ShareCard
                  url={router.asPath}
                  title={complaintData.complaint_title}
                  flexDirection="flex-row"
                  />
              </div>
            }
            placement="right"
            >
            <Share className="fill-slate-500" />
          </Tooltip>
        </div>
        </div>

        <div className="bg-gray-700 rounded-md text-white px-3 py-1 ml-[19rem]">
            From user Side: {complaintData.completed_status}
        </div>
      </div>
  );
}

export default UpvoteDownvoteShare;

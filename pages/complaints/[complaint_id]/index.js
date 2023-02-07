import React from 'react'

function index() {
  return (
    <div>index</div>
  )
} 

import React from "react";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { format, formatDistanceToNow, fromUnixTime } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";

import Downvote from "../../../components/complaints/downvote";
import Upvote from "../../../components/complaints/upvote";

import Completed from "../../../assets/icons/COMPLETED.svg";
import Discussion from "../../../assets/icons/discussion.svg";
import Pending from "../../../assets/icons/PENDING.svg";
import Share from "../../../assets/icons/share.svg";
import ShareCard from "../../../components/shareCard";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  SortBy,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Menu,
  MenuSelect,
  Panel,
} from "react-instantsearch-dom";
import { clearStorage } from "mapbox-gl";

const searchClient = algoliasearch(
  "7EZSSRLOLR",
  "25c7cb6a837952c67aac05d561c3c32b"
);

const Index = () => {
  function Hit(props) {
    const {
      complaint_desc,
      complaint_sub_type,
      complaint_title,
      complaint_type, //complaint_id
      complaint_type_name,
      completed_status,
      created_at,
      dislike_count,
      latitude,
      like_count,
      longitude,
      no_of_comments,
      objectID,
      photo_url,
      profile_picture,
      username,
      ward_id,
      ward_slug,
    } = props.hit;

    const router = useRouter();
    // const FRONTEND_URL = "https://cityzen-ruby.vercel.app/";
    return (
      <div key={objectID} className="flex shadow-md bg-gray-100 md:p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full  overflow-hidden h-10 w-10 relative">
            <Image
              src={profile_picture}
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
              quality={1}
            />
          </div>
          <div className="my-2">
            <Upvote
              setLikeCount={like_count}
              ComplaintId={objectID}
              // token={token}
              vote={like_count}
              placement="top"
            />
            <p className="text-center text-sm">{like_count}</p>
            <Downvote
              setLikeCount={dislike_count}
              ComplaintId={objectID}
              // token={token}
              vote={dislike_count}
              placement="bottom"
            />
          </div>

          {/* //may be issue here */}
          <Link
            className="my-2"
            href={`/complaints/${ward_slug}/${objectID}#comments`}
          >
            <a>
              <Tooltip content={"Comments"} placement="bottom">
                <Discussion className="fill-slate-500" />
              </Tooltip>
              <p className="text-center text-sm">{no_of_comments}</p>
            </a>
          </Link>

          <div className="my-2">
            <Tooltip
              content={
                <ShareCard
                  url={`${router.asPath}/${objectID}`}
                  title={complaint_title}
                  flexDirection="flex-col"
                />
              }
              placement="bottom"
            >
              <Share className="fill-slate-500" />
            </Tooltip>
          </div>
        </div>
        <div className="basis-full">
          <div className="flex px-2 p-2 items-center">
            <div className="font-medium text-lg">{username}</div>
            <Tooltip
              content={format(fromUnixTime(created_at), "dd MMM yyyy hh:mm a")}
              placement="right"
            >
              <div className="ml-2 text-sm font-thin pt-0.5">
                {formatDistanceToNow(fromUnixTime(created_at), {
                  addSuffix: true,
                })}
              </div>
            </Tooltip>
            <div className="ml-auto">
              <Tooltip
                content={completed_status.toLowerCase()}
                placement="left"
              >
                {completed_status == "PENDING" ? (
                  <Pending className="fill-amber-500 h-5 w-5" />
                ) : (
                  <Completed className="fill-green-800 h-5 w-5" />
                )}
              </Tooltip>
            </div>
          </div>
          <div className="flex min-h-60 h-72 w-90 overflow-hidden rounded-md relative mx-2">
            <Image
              src={photo_url}
              alt="Picture of the complaint"
              layout="fill"
              data-nimg="fill"
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-fit-cover"
            />
            {/* <Image
          src={Complaint.photo_url}
          width={1920}
          height={1598}
          layout="responsive"
          alt="Picture of the complaint"
        /> */}
          </div>
          <div className="flex flex-col gap-1 p-2">
            <div className="">{complaint_title}</div>
            <div className="text-xs">{complaint_desc.substring(0, 100)}...</div>
            <div className="text-sm py-1 font-semibold flex items-center">
              <div className="bg-gray-500 rounded-lg py-1 px-2 text-white text-sm">
                {complaint_type_name}
              </div>
              <Link href={`/complaints/${ward_slug}/${objectID}`}>
                <div className="cursor-pointer ml-auto bg-gray-800 font-thin text-zinc-200 py-1 px-3 rounded-3xl">
                  {`more`}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-60 p-4">
      <InstantSearch indexName="challenge2" searchClient={searchClient} >

        <SearchBox placeholder="Search for products " />
        <div className="flex gap-4 border-t-8">
          <div className="flex-1  border-r-2">
            <Hits hitComponent={Hit} />
            {/* <Configure  hitsPerPage={5} /> */}
            <Configure filters="ward_slug:AH-AMC-001" hitsPerPage={5} />
            {/* <Configure filters="ward_id:1" hitsPerPage={5} /> */}
          </div>
          <div className="flex-1 pt-4  ">
            <Panel header="Complaint Types ">
              <MenuSelect attribute="complaint_type_name" />
            </Panel>
            <Panel header="Filters" className="pt-4">
              <SortBy
                  defaultRefinement="challenge2_most_voted"
                  items={[
                    { label: "Recent", value: "challenge2" },
                    { label: "most voted", value: "challenge2_most_voted" }, 
                  ]}

              />
            </Panel>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Index;


export async function getServerSideProps({ req, res,params }) {
  const token = req.cookies.access_token || null;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  
  return {
    props: { token },
  };
}
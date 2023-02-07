import React, { useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { format, formatDistanceToNow, fromUnixTime } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";
import BACKEND_URL from "../../utils";
import axios from "axios";

import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGL from "mapbox-gl/dist/mapbox-gl.js";

import Downvote from "../../components/complaints/downvote";
import Upvote from "../../components/complaints/upvote";

import Completed from "../../assets/icons/COMPLETED.svg";
import Discussion from "../../assets/icons/discussion.svg";
import Pending from "../../assets/icons/PENDING.svg";
import Share from "../../assets/icons/share.svg";
import ShareCard from "../../components/shareCard";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  RangeInput,
  SortBy,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Menu,
  MenuSelect,
  Panel,
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "7EZSSRLOLR",
  "25c7cb6a837952c67aac05d561c3c32b"
);

const Index = ({ token, ward_slug }) => {
  function Hit(props) {
    const {
      complaint_desc,
      complaint_sub_type,
      complaint_title,
      complaint_type,
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
              vote={like_count}
              placement="top"
            />
            <p className="text-center text-sm">{like_count}</p>
            <Downvote
              setLikeCount={dislike_count}
              ComplaintId={objectID}
              vote={dislike_count}
              placement="bottom"
            />
          </div>

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
          <div className="flex min-h-60 h-72 w-90 overflow-hidden rounded-md relative mx-2 bg-black">
            <Image
              src={photo_url}
              alt="Picture of the complaint"
              layout="fill"
              data-nimg="fill"
              objectFit="contain"
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-fit-cover p-8"
            />
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

  // const ward_slug = "AH-AMC-001"

  return (
    <div className="md:ml-60 p-8 ">
      <InstantSearch indexName="challenge2" searchClient={searchClient}>
        <div className="flex ">
          <div className="w-1/2  ">
            <div className="fixed top-11 md:top-0  z-10 bg-gray-100 p-4 border-r-2 border-b-2">
              <SearchBox />
            </div>
            <div className="mt-16 p-16 md:p-4 w-full ">
              <Hits hitComponent={Hit} />
              <Configure filters={`ward_slug:${ward_slug}`} hitsPerPage={5} />
            </div>
          </div>
          <div className="hidden md:inline fixed right-0 top-0 w-2/5 bg-gray-100 pt-10 pl-4 border-l-2 ">
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

export async function getServerSideProps({ req, res }) {
  const token = req.cookies.access_token || null;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const response = await axios({
    method: "GET",
    url: `${BACKEND_URL}authority/councillor/user_profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data.ward_slug.ward_slug;
    })
    .catch((err) => {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    });

  return {
    props: { token, ward_slug: response },
  };
}


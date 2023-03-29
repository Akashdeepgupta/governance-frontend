import React, { useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../../../utils";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";

import SendSVG from "../../../../assets/icons/send.svg";
import CommentList from "../../../../components/CommentsComponents/CommentList";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import MapComponent from "../../../../components/Mapcomponents/MapComponent";

import ComplaintDesc from "../../../../components/DetailedComplaint/ComplaintDesc";
import UpvoteDownvoteShare from "../../../../components/DetailedComplaint/UpvoteDownvoteShare";
import {getCouncillorUpdates} from '../../../../utils';

const getUpdates = async (complaintId) => {
  const url = `${BACKEND_URL}authority/councillor/get_updates?complaint_id=${complaintId}`;
  const response = await axios.get(url);
  const data = await response.data;
  return data;
};

function Complaint_ID({
  Complaint,
  ComplaintSubType,
  ComplaintType,
  UserProfile,
  token,
}) {
  const router = useRouter();
  const [complaintStatus, setComplaintStatus] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [profile_picture, setProfilePicture] = React.useState("");
  const [updatesOnComplaint, setUpdatesOnComplaint] = React.useState([]);
  const [complaintData, setComplaintData] = React.useState({});

  const UpdateRef = React.useRef();

  function MarkAsResolved({setComplaintStatus, complaint_id}) {
    const router = useRouter();
    return (
      <div className="text-center text-xs">
        <p className="mb-2">Are you sure?</p>
        {complaintStatus == 'PENDING' &&<button
          className="bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md"
          onClick={async () => {
            const resp = await handleMarkAsResolved(complaint_id);
            if (resp.status === 401) {
              return resp.status;
            } else if (resp.status === 200) {
              setComplaintStatus("COMPLETED");
            }
          }}
        >
          Resolved
        </button>}
      </div>
    );
  }

  const handleMarkAsResolved = async (complaint_id) => {
    console.log(complaint_id)
    const url = `${BACKEND_URL}authority/councillor/change_status?complaint_id=${complaint_id}`;
    const response = await axios
      .post(
        url,
        {
          complaint_id,
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

  const addUpdate = async (complaint_id, update_text) => {
    const url = `${BACKEND_URL}authority/councillor/make_updates`;
    const response = await axios
      .post(
        url,
        {
          complaint_id,
          update_text,
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

  useEffect(() => {
    if (Complaint) {
      setComplaintData(Complaint);
      getUpdates(Complaint.id).then((data) => setUpdatesOnComplaint(data));
    }
  }, []);

  useEffect(() => {
    if (UserProfile) {
      setUsername(Complaint.username);
      setProfilePicture(UserProfile.profile_picture);
    }
  }, [UserProfile]);

  useEffect(() => {
    if(Complaint){
    getCouncillorUpdates(Complaint.id).then((data) => {
      setComplaintStatus(data.completed_status);
    });
  }
  }, [complaintStatus]);

  return (
    <div className="flex md:ml-60 pt-14 md:pt-8 pb-2 lg:flex-row flex-col">
      <div className="flex-1 flex-col items-center px-2 lg:border-r-[1px] border-gray-400">
        <div
          className={`mx-2 px-2 shadow-sm flex items-center gap-2 ${
            complaintStatus === "PENDING"
              ? "bg-orange-50"
              : "bg-green-50"
          } rounded-sm mb-2`}
        >
          <div className="flex-1 font-thin font-mono text-sm">
            <div className="flex gap-1 items-center">
              <div className="rounded-full m-2 overflow-hidden h-7 w-7 relative">
                <Image
                  src={profile_picture}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                  quality={1}
                />
              </div>
              <p>@{username}</p>
              <Tooltip
                content={format(
                  new Date(Complaint.created_at),
                  "dd MMM yyyy hh:mm a"
                )}
                placement="right"
              >
                <div className="ml-2 text-xs font-extralight pt-0.5">
                  {formatDistanceToNow(new Date(Complaint.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </Tooltip>
            </div>
          </div>
          {complaintStatus == "PENDING" ? (
            <Tooltip
              content={
                <MarkAsResolved
                  setComplaintStatus={setComplaintStatus}
                  token={token}
                  complaint_id={Complaint.id}
                />
              }
              placement="bottom"
            >
              <div className="text-xs px-2 py-1 bg-zinc-800 text-zinc-100 rounded-xl">
                Mark as completed
              </div>
            </Tooltip>
          ):(
            <div className="text-xs px-2 py-1 bg-green-800 text-green-100 rounded-xl">
              Completed
            </div>
          )}
        </div>
        <div className="flex min-h-60 h-80 w-90 overflow-hidden rounded-md relative mx-3">
          <Image
            src={complaintData.photo_url}
            alt="Picture of the complaint"
            layout="fill"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
        <div className="flex gap-6 px-4 py-2 items-center bg-gray-200 shadow-sm shadow-slate-400 m-3 rounded-sm">
          <UpvoteDownvoteShare complaintData={complaintData}/>
        </div>
        <div className="m-3">
          <ComplaintDesc ComplaintType={ComplaintType} ComplaintSubType = {ComplaintSubType} complaintData={complaintData}/>
        </div>
        <div className="shadow-2xl ">
          <CommentList complaintId={complaintData.id} token={token} />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="p-4 md:pt-12">
          <MapComponent lat={Complaint.latitude} lng={Complaint.longitude} />
        </div>
        <div className="py-2 px-4 text-xl ">
          <h1 className="font-thin">Updates on Complaint</h1>
          <h3 className="">Add updates here: </h3>
          <form className="flex ml-2 gap-2">
            <textarea
              ref={UpdateRef}
              maxLength="150"
              minLength="10"
              className="flex-1 text-sm font-semibold max-h-16 resize-none border-2 my-2 px-2 py-1 rounded-sm border-zinc-400 focus:outline-none focus:border-zinc-600"
              placeholder="Add an update"
            ></textarea>
            <button
              className="bg-zinc-900  overflow-hidden text-zinc-200 px-2 py-1 rounded-xl my-3"
              onClick={async (e) => {
                e.preventDefault();
                if(UpdateRef.current.value.length < 10) return alert("Update should be atleast 10 characters long")
                const dataupdate = await addUpdate(
                  complaintData.id,
                  UpdateRef.current.value
                );
                if (dataupdate.status == 200) {
                  UpdateRef.current.value = "";
                  setUpdatesOnComplaint((prev) => [
                    dataupdate.data,
                    ...prev,
                  ]);
                } else if (dataupdate.status == 401) {
                  router.push("auth/login");
                }
              }}
            >
              <SendSVG className={`fill-current h-4 w-4 `} />
            </button>
          </form>
          <ul className="max-h-60 overflow-auto">
            {updatesOnComplaint.length ? (
              updatesOnComplaint.map((update) => (
                <li
                  key={update.id}
                  className="text-sm font-semibold text-gray-800 px-4 py-2 bg-slate-300 my-2 rounded-lg flex flex-col gap-2"
                >
                  <Tooltip
                    content={format(
                      new Date(update.created_at),
                      "dd MMM yyyy hh:mm a"
                    )}
                    placement="right"
                    className="text-xs font-extralight pt-0.5"
                  >
                    {formatDistanceToNow(new Date(update.created_at), {
                      addSuffix: true,
                    })}
                  </Tooltip>
                  <h1>{update.update_text}</h1>
                </li>
              ))
            ) : (
              <h1 className="text-center text-sm font-semibold text-gray-800 px-4 py-2 bg-slate-100 my-2 rounded-lg flex flex-col gap-2">
                No updates yet...
              </h1>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Complaint_ID;

export async function getServerSideProps({ req, res, params }) {
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

  if (response !== params.ward_slug) {
    return {
      redirect: {
        destination: "/complaints/unauthorized_acces",
        permanent: false,
      },
    };
  }

  const url = `${BACKEND_URL}/complaints/${params.ward_slug}/${params.complaint_id}/`;
  const complaint = await axios.get(url);
  const complaint_data = await complaint.data;
  if (!complaint) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      token,
      Complaint: complaint_data.Complaint,
      ComplaintSubType: complaint_data.ComplaintSubType,
      ComplaintType: complaint_data.ComplaintType,
      UserProfile: complaint_data.UserProfile,
    },
  };
}

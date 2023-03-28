import React from 'react'

function ComplaintDesc({complaintData, ComplaintType, ComplaintSubType}) {
  return (
    <div>
        <div className="flex flex-wrap items-start gap-2 my-2 text-white text-xs md:text-sm">
            <div className="bg-gray-500 rounded-lg py-1 px-2">
              {ComplaintType.type_name}
            </div>
            <div className="bg-gray-500 rounded-lg py-1 px-2">
              {ComplaintSubType.sub_type_name}
            </div>
          </div>
          <h1 className="text-lg font-semibold">
            {complaintData.complaint_title}
          </h1>
          <article className="text-sm font-thin pl-2">
            {complaintData.complaint_desc}
          </article>
    </div>
  )
}

export default ComplaintDesc;
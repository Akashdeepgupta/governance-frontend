import React, { useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";
import BACKEND_URL from "../../utils";
import axios from "axios";
import Hit from "../../components/complaints/Hit"
import "mapbox-gl/dist/mapbox-gl.css";




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

  return (
    <div className="md:ml-60 ">
      <InstantSearch indexName="challenge2" searchClient={searchClient}>
        <Configure filters={`ward_slug:${ward_slug}`} hitsPerPage={1} />
        
        <div className="flex ">
          
          <div className="flex-1">
            <div className="px-2 py-1">
              <SearchBox />
            </div>
            <div className="overflow-y-auto h-screen">
              <Hits hitComponent={Hit} />
            <Pagination showPrevious={true} />
            </div>
          </div>
          
          
          <div className="flex-1 bg-gray-100 pt-10 pl-4 border-l-2 ">
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


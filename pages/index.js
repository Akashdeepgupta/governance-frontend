import Link from "next/link";
import React from "react";
import Feature1SVG from '../assets/icons/sc-svgrepo-com.svg'
import HowItWorkSVG from "../assets/icons/howitworks.svg";
import Footer from "../components/Footer";
import IntroVideo from "../components/HomePage/IntroVideo";
function Home() {
  return (
    <div className="md:ml-60 bg-cover bg-no-repeat bg-right">
      <header id="intro" className="flex flex-col xl:flex-row py-0 md:py-14">
        <div className="flex-1 p-10 py-48 md:py-32">
          <div className="pl-0 md:pl-4">
            <h1 className="text-center md:text-left my-4  text-7xl font-extrabold tracking-tight leading-none text-gray-800 md:text-5xl lg:text-6xl">
              Cityzen
            </h1>
            <p className="text-center md:text-left text-lg font-normal text-gray-500 lg:text-xl">
              Grievance Platform for every citizen to lodge civic complaints
            </p>
            <div className="flex items-center">
              <Link href={"/complaints"}>
                <a className="inline-flex mx-auto md:mx-0 justify-center items-center my-4 py-3 px-5 text-base font-medium text-white bg-zinc-700 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-300">
                  Check Ward Grievances
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      ule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`videoBg flex-1 px-10 py-20 md:p-36 md:pr-10 bg-gray-700 xl:bg-transparent`}
        >
          <IntroVideo
            videoUrl="https://res.cloudinary.com/sidster/video/upload/v1664700591/videos/Project_10-01_Full_HD_1080p_MEDIUM_FR30.mp4"
            posterURL="/backgroundSvgs/fill.svg"
          />
        </div> 
      </header>
      <section id="howitworks" className="flex flex-col md:py-14 md:flex-row">
        <div className="hidden lg:inline py-10">
          <HowItWorkSVG className="w-full h-96" />
        </div>
        <div className="flex-1 p-10 py-20 lg:p-20 md:p-36">
          <h1 className="text-center my-4  text-4xl font-extrabold tracking-tight leading-none text-gray-800 md:text-3xl lg:text-4xl">
            How it works
          </h1>
          <p className=" text-center text-lg font-normal text-gray-500 lg:text-xl">
            Cityzen is a platform for citizens to lodge complaints about civic
            issues. The complaints are then forwarded to the concerned
            authorities.
          </p>
          <div className="flex items-center mt-4">
            <Link href={"/howitworks"}>
              <a className="inline-flex mx-auto justify-center items-center my-4 py-3 px-5 text-base font-medium text-white bg-zinc-700 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-300">
                Mannual
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    ule="evenodd"
                  ></path>
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="bg-gray-700 xl:bg-white py-10">
        <h1 className="text-center my-4 text-4xl font-extrabold tracking-tight leading-none text-gray-200 xl:text-zinc-900 md:text-3xl lg:text-4xl">
          Features
        </h1>
        <div>
          <div className="flex-1 p-10 grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2">
            <div className="flex flex-col gap-4 items-center py-4 rounded-lg bg-gray-800">
              <Feature1SVG className="w-10 h-10" />
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight leading-none text-gray-200">
                Wardwise Division
              </h1>
              <p className=" text-sm font-normal text-gray-300 lg:text-base px-10 text-center">
                Wardwise division of complaints for better management
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center py-4 rounded-lg bg-gray-800">
              <Feature1SVG className="w-10 h-10" />
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight leading-none text-gray-200">
                Geolocation
              </h1>
              <p className=" text-sm font-normal text-gray-300 lg:text-base px-10 text-center">
                Accurate Geolocation of complaint keeping complainant Location
                anonymous.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center py-4 rounded-lg bg-gray-800">
              <Feature1SVG className="w-10 h-10" />
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight leading-none text-gray-200">
                User anonymity
              </h1>
              <p className=" text-sm font-normal text-gray-300 lg:text-base px-10 text-center">
                User anonymity is maintained showing username only and dummy
                photo.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center py-4 rounded-lg bg-gray-800">
              <Feature1SVG className="w-10 h-10" />
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight leading-none text-gray-200">
                Data Validation
              </h1>
              <p className=" text-sm font-normal text-gray-300 lg:text-base px-10 text-center">
                Image Validation done for better safety.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;


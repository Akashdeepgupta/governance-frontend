import React from "react";

function IntroVideo({ videoUrl, posterURL }) {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("mouseover", () => {
        videoRef.current.play();
        videoRef.current.controls = true;
      });
      videoRef.current.addEventListener("mouseout", () => {
        videoRef.current.controls = false;
      });
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("mouseover", () => {
          videoRef.current.play();
          videoRef.current.controls = true;
        });
        videoRef.current.removeEventListener("mouseout", () => {
          videoRef.current.controls = false;
        });
      }
    };
  }, [videoRef]);
  return (
    <video
      muted
      ref={videoRef}
      className=" w-full md:w-4/5 h-full rounded-xl hover:border-gray-400 border-2 border-transparent"
      poster={posterURL}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}

export default IntroVideo;

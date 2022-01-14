import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayed } from "../redux/features/video";

export default function VideoContainer() {
  const { video } = useSelector((state) => state.video);
  const videoTag = useRef();
  const source = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (source.current) {
      source.current.setAttribute(
        "src",
        "https://alucinaprojects.s3.us-west-2.amazonaws.com/profuturo/Profuturo-Video-Retiro.mp4"
      );
      source.current.setAttribute("type", "video/mp4");
      videoTag.current.load();
      if (video.visible) {
        videoTag.current.play();
      }
    }
  }, [video]);

  const handleVideoStatus = () => {
    dispatch(setPlayed(true));
    console.log("ok");
  };

  return (
    <div className={"videoContainer"}>
      <div
        style={
          video.active
            ? { transform: "scale(1)", opacity: 1 }
            : { transform: "scale(0)", opacity: 0 }
        }
      >
        <video
          ref={videoTag}
          controls
          style={{
            transform: video.visible ? "translateX(0vw)" : "translateX(69vw)",
          }}
          onEnded={handleVideoStatus}
        >
          <source ref={source} src={video.url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

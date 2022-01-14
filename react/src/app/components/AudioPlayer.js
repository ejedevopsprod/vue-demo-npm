import React from "react";
import audio from "../assets/audio.svg";
import audioOff from "../assets/audiooff.svg";

export default function AudioPlayer({ isPlaying, onPlay, onPause }) {
  const handleClick = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className="player" onClick={handleClick}>
      <img src={isPlaying ? audio : audioOff} />
    </div>
  );
}

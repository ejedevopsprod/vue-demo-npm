import React from "react";

export default function useScale() {
  let scale =
    window.innerHeight > window.innerWidth
      ? (window.innerHeight / 1400) * 1.6
      : (window.innerWidth / 2150) * 1.6;
  if (1400 * scale < window.innerHeight) {
    scale = (window.innerHeight / 1400) * 1.6;
  }
  return scale;
}

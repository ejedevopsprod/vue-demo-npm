import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setTransition } from "../redux/features/transition";
import Lottie from "lottie-web";
import { AnimatedSprite, Container, Sprite } from "@inlet/react-pixi/animated";
import * as PIXI from "pixi.js";
import eye from "../assets/anim/eye.svg";
import isVisible from "../utils/isVisible";

const LottieSprite = ({ data, position, width, height, currentNode }) => {
  const [frames, setFrames] = useState([]);
  const dispatch = useDispatch();
  const wrapper = document.createElement("div");
  const lastNode = useRef();
  const play = isVisible(
    [
      currentNode,
      lastNode.current,
      ...currentNode.descendants.map((e) => {
        return e.node;
      }),
    ],
    position,
    width,
    height
  );
  lastNode.current = currentNode;
  let anim = Lottie.loadAnimation({
    container: wrapper,
    renderer: "svg",
    loop: false,
    autoplay: false,
    animationData: data,
  });
  anim.goToAndStop(0, true);
  let svgNode = wrapper.firstElementChild.cloneNode(true);
  svgNode.setAttribute("width", width);
  svgNode.setAttribute("height", height);
  const firstFrame = new XMLSerializer().serializeToString(svgNode);
  useEffect(() => {
    if (play.res && !frames.length) {
      setTimeout(() => {
        makeFrames();
      }, 2000);
    }
  }, [play]);

  const makeFrames = (i = 0, images = []) => {
    if (i < anim.totalFrames) {
      anim.goToAndStop(i, true);
      svgNode = wrapper.firstElementChild.cloneNode(true);
      svgNode.setAttribute("width", width);
      svgNode.setAttribute("height", height);
      //console.log(new XMLSerializer().serializeToString(svgNode));
      images.push(new XMLSerializer().serializeToString(svgNode));
      makeFrames(i + 1, images);
    } else {
      //console.log("animation created", play.isDescendant);
      setFrames(images);
      dispatch(setTransition(false));
    }
  };

  //console.log("lottie", play.isDescendant);

  return play.res ? (
    <Container>
      {frames.length ? (
        <AnimatedSprite
          images={frames}
          isPlaying={true}
          initialFrame={0}
          animationSpeed={0.5}
          position={position}
        />
      ) : (
        <Sprite image={firstFrame} position={position} />
      )}
    </Container>
  ) : null;
};

export default LottieSprite;

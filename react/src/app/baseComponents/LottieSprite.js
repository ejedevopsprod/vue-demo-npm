import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setTransition } from "../redux/features/transition";
import Lottie from "lottie-web";
import { AnimatedSprite, Container, Sprite } from "@inlet/react-pixi/animated";
import * as PIXI from "pixi.js";
import eye from "../assets/anim/eye.svg";
import isVisible from "../utils/isVisible";

const LottieSprite = ({
  data,
  width,
  height,
  position,
  playSegments,
  loop,
  play,
  onComplete,
  cursor = "default",
  interactive,
  click,
  anchor = [0, 0],
  wait = 0,
}) => {
  const [frames, setFrames] = useState([]);
  const [isPlaying, setPlaying] = useState(play);
  const prevSegments = useRef(playSegments);
  const changeSegment = useRef(false);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const wrapper = document.createElement("div");
  let anim = Lottie.loadAnimation({
    container: wrapper,
    renderer: "svg",
    loop: false,
    autoplay: false,
    animationData: data,
  });
  let svgNode = wrapper.firstElementChild.cloneNode(true);
  anim.goToAndStop(0, true);
  svgNode.setAttribute("width", width);
  svgNode.setAttribute("height", height);
  let firstFrame = new XMLSerializer().serializeToString(svgNode);

  useEffect(() => {
    isFirstRender.current = false;
    setTimeout(
      () => {
        makeFrames();
      },
      wait ? 0 : 1000
    );
  }, []);

  useEffect(() => {
    //changeSegment.current = !changeSegment.current;
    //makeFrames();
  }, [width, height]);

  useEffect(() => {
    setPlaying(play);
  }, [play]);

  useEffect(() => {
    if (playSegments) {
      if (
        playSegments[0] !== prevSegments.current[0] ||
        playSegments[1] !== prevSegments.current[1]
      ) {
        changeSegment.current = !changeSegment.current;
        makeFrames();
      }
      prevSegments.current = playSegments;
    }
  }, [playSegments]);

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
      setTimeout(() => {
        setFrames(images);
        setPlaying(play);
      }, wait);
      //dispatch(setTransition(false));
    }
  };

  const segment = frames.length
    ? frames.slice(
        playSegments ? playSegments[0] : 0,
        playSegments ? playSegments[1] : anim.totalFrames
      )
    : [firstFrame];

  const handleComplete = (e) => {
    if (!loop) {
      setPlaying(false);
    }
    if (onComplete) {
      onComplete();
    }
  };

  //console.log(position, position.x);

  return (
    <Container cursor={cursor} interactive={!!interactive} click={click}>
      {frames.length ? (
        changeSegment.current ? (
          <AnimatedSprite
            images={segment}
            isPlaying={isPlaying}
            initialFrame={isPlaying || !play ? 0 : segment.length - 1}
            animationSpeed={0.5}
            position={position}
            onLoop={handleComplete}
            anchor={anchor}
          />
        ) : (
          <Container>
            <AnimatedSprite
              images={segment}
              isPlaying={isPlaying}
              initialFrame={isPlaying || !play ? 0 : segment.length - 1}
              animationSpeed={0.5}
              position={position}
              onLoop={handleComplete}
              anchor={anchor}
            />
          </Container>
        )
      ) : (
        <AnimatedSprite
          images={[firstFrame]}
          isPlaying={false}
          initialFrame={0}
          animationSpeed={0.5}
          position={position}
          anchor={anchor}
        />
      )}
    </Container>
  );
};

export default LottieSprite;

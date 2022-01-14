import { Container, Graphics } from "@inlet/react-pixi/animated";
import Lottie from "lottie-web";
import React, { useCallback, useEffect, useRef } from "react";

export default function ReactLottie({
  parent = document.querySelector(".gameHTMLContainer"),
  id,
  id2,
  key,
  interactive,
  position,
  width,
  height,
  click,
  data,
  loop = false,
  play,
  playSegments,
  cursor,
  transform = "",
  onComplete = () => {},
  stop,
  pause,
  scale,
  alpha,
  className,
  containerScale = 1,
  speed = 1,
}) {
  const wrapper = document.createElement("div");
  const relativeScale = window.innerWidth / 1536;
  wrapper.classList.add(`child${id}`);
  parent.style.transform = `scale(${relativeScale * containerScale})`;
  if (className) wrapper.classList.add(className);

  const anim = useRef();
  const element = useRef();
  const firstRender = useRef(true);

  const label = useCallback((g) => {
    g.clear();
    g.beginFill(0x000000, 0.00000001);
    g.drawRect(0, 0, width, height);
    g.endFill();
  });

  useEffect(() => {
    parent.appendChild(wrapper);
    anim.current = Lottie.loadAnimation({
      container: wrapper,
      renderer: "svg",
      loop: loop,
      autoplay: false,
      animationData: data,
      onComplete: onComplete(),
    });
    anim.current.setSpeed(speed);

    return () => {
      parent.removeChild(wrapper);
    };
  }, []);

  useEffect(() => {
    if (stop) {
      if (playSegments) {
        anim.current.playSegments(playSegments, true);
      }
      anim.current.stop();
    }
  }, [stop]);

  useEffect(() => {
    if (pause) {
      anim.current.pause();
    }
  }, [pause]);

  useEffect(() => {
    //console.log(id2, "PLAY");
    if (anim.current) {
      if (stop) {
        if (playSegments) {
          anim.current.playSegments(playSegments, true);
        }
        anim.current.stop();
      } else {
        if (play) {
          if (playSegments) {
            anim.current.playSegments(playSegments, true);
            setTimeout(() => {
              //anim.current.stop();
            }, 500);
          } else {
            anim.current.play();
          }
        } else {
          anim.current.pause();
        }
      }
    }
  }, [play, playSegments]);

  useEffect(() => {
    element.current = document.querySelector(`.gameHTMLContainer .child${id}`);
    element.current.style.position = `absolute`;
    element.current.style.width = `${width}px`;
    element.current.style.height = `${height}px`;
    element.current.style.left = `${position[0] || position.x}px`;
    element.current.style.top = `${position[1] || position.y}px`;
    element.current.style.transform = transform;
    document.querySelector(
      `.gameHTMLContainer .child${id} svg`
    ).style.opacity = `${alpha}`;
    document.querySelector(
      `.gameHTMLContainer .child${id} svg`
    ).style.transform = `scale(${scale})`;
    //console.log(alpha);
  });

  //console.log(playSegments);

  //console.log("render", id, anim.current && anim.current.currentFrame);

  return (
    <Container
      interactive={interactive}
      position={position}
      click={click}
      cursor={cursor}
    >
      <Graphics draw={(g) => label(g)} />
    </Container>
  );
}

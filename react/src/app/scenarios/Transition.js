import { Container } from "@inlet/react-pixi";
import { Graphics } from "pixi.js";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../utils/useWindowSize";

const Transition = memo(({ children }) => {
  const Animated = () => {
    const { transition } = useSelector((state) => state.transition);
    const { section } = useSelector((state) => state.general);
    const [scale, setScale] = useState();
    const firstRender = useRef(true);
    const windowSize = useWindowSize();
    //console.log("-->", transition);

    useEffect(() => {
      if ((!section && !transition) || !firstRender.current) {
        setScale(0);
      }
    }, [windowSize]);

    useEffect(() => {
      if ((!section && !transition) || !firstRender.current) {
        //console.log("transition", transition ? 1 : 0);
        setScale(transition ? 1 : 0);
      }
      firstRender.current = false;
    }, [transition]);

    useEffect(() => {
      setTimeout(() => {
        if (
          scale >= 0 &&
          ((!transition && scale < 1) || (transition && scale <= 1))
        ) {
          /*
          console.log(
            "scale",
            !section && !transition
              ? 1
              : scale -
                  (transition
                    ? 0.03
                    : !transition && scale === 1
                    ? 0.03
                    : -0.03)
          );
          */

          setScale(
            !section && !transition
              ? 1
              : scale -
                  (transition
                    ? 0.05
                    : !transition && scale === 1
                    ? 0.05
                    : -0.05)
          );
        }
      }, 15);
    }, [transition, scale]);

    const mask = (scale) => {
      const graphics = new Graphics();
      graphics.beginFill(0xffffff);
      graphics.drawCircle(
        window.innerWidth / 2,
        window.innerHeight / 2,
        (Math.sqrt(
          Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
        ) /
          2) *
          scale
      );
      graphics.endFill();
      return graphics;
    };

    return <Container mask={mask(scale)}>{children}</Container>;
  };

  return <Animated />;
});
export default Transition;

import { Container, Sprite, Graphics } from "@inlet/react-pixi/animated";
import React, { useCallback } from "react";
import { Spring } from "@react-spring/core";

import background from "../assets/games/phoneGame/loading_bar.png";

const ProgressBar = ({
  value = 0,
  limit = 100,
  width = 430,
  height = 250,
  x = 0,
  y = 0,
  backgroundVisible = true,
  color = 0xffffff,
  centerPivot,
}) => {
  const spring = { mass: 1, tension: 1, friction: 1 };
  const pivot = centerPivot ? [width / 2, 0] : 0;
  let progress = (value * 100) / limit;
  progress = (progress * width) / 100;

  const barContainer = useCallback((graphics) => {
    graphics.clear();
    graphics.lineStyle(5, 0x127ee0, 1);
    graphics.drawRoundedRect(10, height, width, 30, 50);
    graphics.endFill();
  }, []);

  const barContainerMask = useCallback((graphics) => {
    graphics.clear();
    graphics.lineStyle(10, 0xffffff, 1);
    graphics.drawRoundedRect(10, height, width, 30, 50);
    graphics.endFill();
  }, []);

  const barProgress = useCallback(
    (graphics) => {
      graphics.clear();
      graphics.beginFill(color, 1);
      graphics.drawRoundedRect(0, height, progress, 30, 50);
      graphics.endFill();
    },
    [value]
  );

  return (
    <Container x={x} y={y} zIndex={2} pivot={pivot}>
      <Sprite
        visible={backgroundVisible}
        image={background}
        x={12}
        y={height}
        zIndex={1}
        width={width - 5}
        height={30}
      />
      <Graphics draw={barContainerMask} zIndex={1} />
      <Spring
        from={{ x: 435, y: 0 }}
        to={{ x: 435 - progress, width: progress }}
        native
        config={spring}
      >
        {(props) => <Graphics {...props} draw={barProgress} zIndex={2} />}
      </Spring>
      <Graphics draw={barContainer} zIndex={3} />
    </Container>
  );
};

export default ProgressBar;

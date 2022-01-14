import { Container, Sprite, Graphics } from "@inlet/react-pixi/animated";
import React, { useCallback, useRef } from "react";
import { Spring, config } from "@react-spring/core";
import background from "../../../assets/games/messageGame/vertical_bar.png";

const ProgressBar = ({
  value = 0,
  limit = 100,
  width = 20,
  height = 300,
  x = 0,
  y = 0,
  color = 0xffffff,
}) => {
  let progress = (value * 100) / limit;
  progress = (progress * height) / 100;

  const mask = useRef(null);

  const barContainer = useCallback((graphics) => {
    graphics.clear();
    graphics.lineStyle(5, 0x127ee0, 1);
    graphics.drawRoundedRect(10, 250, width, height, 50);
    graphics.endFill();
  }, []);

  const barContainerMask = useCallback((graphics) => {
    graphics.clear();
    graphics.beginFill(0x000000, 1);
    graphics.drawRoundedRect(10, 250, width, height, 50);
    graphics.endFill();
  }, []);

  const barProgress = useCallback(
    (graphics) => {
      graphics.clear();
      graphics.beginFill(0xFFFFFF, 1);
      graphics.drawRoundedRect(10, 250, width, height, 50);
      graphics.endFill();
    },
    [value]
  );

  //return null

  return (
    <Container x={x} y={y} zIndex={2} mask={mask.current}>
      <Graphics ref={mask} draw={barContainerMask} zIndex={10} />
      <Sprite
        image={background}
        x={10}
        y={250}
        zIndex={1}
        width={width}
        height={height}
      />
      <Container>
        <Spring
          to={{ y: - progress }}
          native
          config={config.molasses}
        >
          {(props) => <Graphics {...props} draw={barProgress} zIndex={2} />}
        </Spring>
      </Container>
      <Graphics draw={barContainer} zIndex={3} />
    </Container >
  );
};

export default ProgressBar;

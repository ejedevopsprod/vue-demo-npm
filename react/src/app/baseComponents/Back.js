import { Container, Graphics } from "@inlet/react-pixi/animated";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Spring } from "react-spring";
import { setSection } from "../redux/features/general";
import { setTransition } from "../redux/features/transition";

export default function Back({ click }) {
  const spring = { mass: 8, tension: 1000, friction: 100 };
  const scale = window.innerWidth / 1536;
  const container = useCallback((g) => {
    g.clear();

    g.lineStyle(2.5, 0xe8993d, 1);
    g.beginFill(0xffffff, 1);
    g.drawCircle(0, 0, 42);
    g.endFill();
  });

  const arrow = useCallback((g) => {
    g.clear();

    g.lineStyle({
      width: 5,
      color: 0xe8993d,
      join: "round",
    });
    g.beginFill(0xe8993d, 1);
    g.moveTo(-22, 0);
    g.lineTo(11, -19);
    g.lineTo(11, 19);
    g.lineTo(-22, 0);
    g.closePath();
    g.endFill();
  });

  const shadow = useCallback((g) => {
    g.clear();

    g.lineStyle({
      width: 5,
      color: 0xd67d17,
      join: "round",
    });
    g.beginFill(0xd67d17, 1);
    g.moveTo(-22, 0);
    g.lineTo(11, -19);
    g.lineTo(11, 19);
    g.lineTo(-22, 0);
    g.closePath();
    g.endFill();
  });

  const Animated = () => {
    const dispatch = useDispatch();
    const [pressed, setPressed] = useState({ isPressed: false, x: 0, y: -4 });

    const handlePress = () => {
      if (!pressed.isPressed) {
        setPressed({ isPressed: true, x: 0, y: -1 });
      } else {
        setPressed({ isPressed: false, x: 0, y: -4 });
        click();
      }
    };

    return (
      <Spring to={{ ...pressed }} config={spring}>
        {(props) => (
          <Container
            interactive={true}
            cursor={"pointer"}
            pointerdown={handlePress}
            pointerup={handlePress}
            x={75 * scale}
            y={75 * scale}
            scale={scale}
          >
            <Graphics draw={container} />
            <Graphics draw={shadow} />
            <Graphics {...props} draw={arrow} />
          </Container>
        )}
      </Spring>
    );
  };

  return <Animated />;
}

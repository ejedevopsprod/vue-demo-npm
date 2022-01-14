import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Container, Graphics, Sprite, Text } from "@inlet/react-pixi/animated";
import { TextStyle } from "pixi.js";
import { Spring } from "react-spring";

const Button = (props) => {
  const [isBtnActive, setBtnActive] = useState(false);
  const [firstRender, setFirstRender] = useState(3);
  const text = useRef();
  const [textWidth, setTextWidth] = useState();

  const label = useCallback((g) => {
    g.clear();
    g.beginFill(0xe8993d, 1);
    g.drawRoundedRect(0, 0, textWidth, 35, 40);
    g.endFill();
  });

  const labelBack = useCallback((g) => {
    g.clear();
    g.beginFill(0xd67d17, 1);
    g.drawRoundedRect(0, 0, textWidth, 35, 40);
    g.endFill();
  });

  const btnDown = (id) => {
    setBtnActive(true);
  };

  const btnUp = (id) => {
    setTimeout(() => {
      setBtnActive(false);
      //setVisible(0);
    }, 50);
  };

  useEffect(() => {
    setTextWidth(text.current.width);
  }, []);

  useEffect(() => {
    if (firstRender > 0) setFirstRender(firstRender - 1);
  }, [firstRender]);

  return (
    <Container
      position={[window.innerWidth / 2 - 450, window.innerHeight / 2 + 100]}
      interactive="true"
      cursor="pointer"
      pointerdown={btnDown}
      pointerup={btnUp}
    >
      <Graphics draw={(g) => labelBack(g)} />
      <Container x={isBtnActive ? props.x : -2} y={isBtnActive ? props.y : -4}>
        <Graphics draw={(g) => label(g)} />
        <Text
          ref={text}
          text={props.button || "JUGAR"}
          x={25}
          y={9}
          style={
            new TextStyle({
              fontFamily: "Poppins-Bold",
              fontSize: 14,
              fontWeight: "bold",
              fill: "#fff",
            })
          }
        />
      </Container>
    </Container>
  );
};

export default Button;

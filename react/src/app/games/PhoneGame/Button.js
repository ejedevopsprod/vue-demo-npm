import { Container, Graphics, Text } from "@inlet/react-pixi/animated";
import React, { useState, useEffect, useCallback } from "react";
import { Spring } from "react-spring";
import { TextStyle } from "pixi.js";

const CircleButton = ({
  index = 0,
  value = 0,
  onClick = () => null,
  attempts = 0,
}) => {
  const spring = { mass: 8, tension: 1000, friction: 100 };
  const [pressed, setPressed] = useState({ isPressed: false, x: 0, y: 0 });
  const [buttonColor, setButtonColor] = useState(0x127ee0);

  const onPressHandler = () => {
    const { isPressed } = pressed;
    if (!isPressed) {
      onClick(value);
      setButtonColor(0xe7993d);
    }

    setPressed({
      isPressed: !isPressed,
      x: 0,
      y: 0,
    });
  };

  const button = useCallback(
    (graphics) => {
      graphics.beginFill(buttonColor);
      graphics.drawCircle(60, 185, 50); // drawCircle(x, y, radius)
      graphics.endFill();
    },
    [buttonColor]
  );

  let axisX = (index % 4) * 150,
    axisY = index > 3 ? 150 : 0;

  useEffect(() => {
    setButtonColor(0x127ee0);
  }, [attempts]);

  const style = new TextStyle({
    fontFamily: "Poppins-Bold",
    align: "center",
    fontWeight: "bold",
    fill: "#FFFFFF",
    wordWrap: true,
    wordWrapWidth: 350,
  });

  return (
    <Spring native from={{ scale: 0 }} to={{ scale: 1 }} config={spring}>
      {(props) => (
        <Container
          {...props}
          interactive={true}
          cursor={"pointer"}
          pointerdown={onPressHandler}
          pointerup={onPressHandler}
          x={axisX}
          y={axisY}
        >
          <Graphics draw={button} />
          <Text style={style} text={value} anchor={0.5} x={60} y={180} />
        </Container>
      )}
    </Spring>
  );
};

export default CircleButton;

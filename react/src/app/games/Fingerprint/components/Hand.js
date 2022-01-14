import React, { useState, useEffect, useCallback } from "react";
import { Container, Sprite, Graphics } from "@inlet/react-pixi/animated";
import { Spring } from "react-spring";

import handLeft from "../../../assets/games/fingerprint/hand_01.png";
import handRight from "../../../assets/games/fingerprint/hand_02.png";
import fingerprint from "../../../assets/games/fingerprint/fingerprint.png";

const Hand = ({
  initialPos = { x: 100, y: 100 },
  currentPos = { x: 100, y: 100 },
  isVisible = false,
  handSide = 'left',
  onClick = () => null,
}) => {
  const spring = { mass: 8, tension: 1000, friction: 100 };
  const [fingerprintVisible, setFingerprintVisible] = useState(false)

  const onPressHandler = () => {
    setFingerprintVisible(true);
    if (!fingerprintVisible) onClick()
  }

  const container = useCallback(graphics => {
    graphics.clear();
    graphics.beginFill(0xFFFFFF, 0.1);
    graphics.drawRoundedRect(0, 0, 50, 80, 50);
    graphics.endFill();
  }, []);

  if (!isVisible) return null

  return <Spring native
    from={{ ...initialPos }}
    to={{ ...currentPos }} config={spring}>
    {
      props => <Container
        {...props}
      >
        <Sprite
          image={handSide === 'left' ? handLeft : handRight}
          height={500}
          width={400}
        />
        <Container
          height={100}
          width={70}
          y={40}
          x={handSide === 'left' ? 305 : 25}
          interactive={true}
          cursor={"pointer"}
          pointerdown={onPressHandler}
          pointerup={onPressHandler}
        >
          <Graphics
            visible={!fingerprintVisible} draw={container} zIndex={1} />
          <Sprite
            visible={fingerprintVisible}
            image={fingerprint}
            height={400}
            width={70}
            zIndex={2}
          />
        </Container>
      </Container>
    }
  </Spring>
}

export default Hand
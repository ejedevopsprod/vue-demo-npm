import { Container, Sprite } from "@inlet/react-pixi/animated";
import React, { memo, useEffect, useRef, useState } from "react";
import { Spring } from "react-spring";
import sprites from "../../../assets/map/people/guy.png";
import isometricCalc from "../../../utils/isometricCalc";

const Walking = memo(() => {
  const Animated = () => {
    const [position, setPosition] = useState(isometricCalc(0, -5));
    const walkDirection = useRef(true);
    const positions = [isometricCalc(690, -5), isometricCalc(0, -5)];
    const [rotation, setRotation] = useState({ angle: 30 });

    useEffect(() => {
      setTimeout(() => {
        setPosition(walkDirection.current ? positions[0] : positions[1]);
        walkDirection.current = !walkDirection.current;
      }, 20500);
    }, [position]);

    useEffect(() => {
      setTimeout(() => {
        setRotation({ angle: rotation.angle === 10 ? -10 : 10 });
      }, 500);
    }, [rotation]);

    useEffect(() => {
      setPosition(positions[0]);
    }, []);

    return (
      <Spring to={{ ...position }} config={{ duration: 20000 }}>
        {(props) => (
          <Spring to={{ ...rotation }}>
            {(values) => (
              <Container {...props}>
                <Sprite {...values} image={sprites} anchor={[0.5, 1]} />
              </Container>
            )}
          </Spring>
        )}
      </Spring>
    );
  };

  return <Animated />;
});

export default Walking;

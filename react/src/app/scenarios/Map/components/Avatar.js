import React, { memo, useEffect, useRef, useState } from "react";
import { Sprite } from "@inlet/react-pixi/animated";
import avatar from "../../../assets/avatar.png";
import { useSelector } from "react-redux";
import { Spring } from "react-spring";
import indicator from "../../../assets/indicator.png";

export const Avatar = memo(({ x, y, zIndex }) => {
  const spring = { mass: 5, tension: 1000, friction: 100 };

  const Animated = () => {
    const { avatarPosition } = useSelector((state) => state.avatar);
    const { isMapActive } = useSelector((state) => state.map);
    const lastPosition = useRef(0);
    const newPosition = useRef(
      Object.values(avatarPosition).length ? avatarPosition : { x, y, zIndex }
    );
    const [transform, setTransform] = useState({ scale: 0, alpha: 0 });

    useEffect(() => {
      if (isMapActive) setTransform({ scale: 0.8, alpha: 1 });
    }, [isMapActive]);

    if (lastPosition.current && avatarPosition !== lastPosition.current) {
      newPosition.current = lastPosition.current;
      setTransform({ scale: 0, alpha: 0 });
      setTimeout(() => {
        newPosition.current = avatarPosition || { x, y, zIndex };
        setTransform({ scale: 0.8, alpha: 1 });
      }, 200);
    }
    lastPosition.current = avatarPosition;

    return (
      <Spring native to={transform} config={spring}>
        {(props) => (
          <>
            <Sprite
              anchor={[0.5, 0.7]}
              image={indicator}
              {...props}
              {...newPosition.current}
            />
            <Sprite
              anchor={[0.5, 1]}
              image={avatar}
              {...props}
              {...newPosition.current}
            />
          </>
        )}
      </Spring>
    );
  };
  return <Animated />;
});

export default Avatar;

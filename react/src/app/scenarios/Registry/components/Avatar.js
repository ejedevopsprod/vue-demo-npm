import React, { memo, useEffect, useRef, useState } from "react";
import { Sprite } from "@inlet/react-pixi/animated";
import { Spring } from "react-spring";
import avatar from "../../../assets/avatar.png";
import indicator from "../../../assets/indicator.png";

const Avatar = memo(
  ({ anchor, direction, prevDirection, begin }) => {
    const spring = { mass: 5, tension: 1000, friction: 100 };
    const Animated = () => {
      const [visible, setVisible] = useState(begin ? 0 : 1);
      const currentDirection = useRef(prevDirection);

      useEffect(() => {
        setVisible(0);
        setTimeout(
          () => {
            currentDirection.current = direction;
            setVisible(1);
          },
          begin ? 100 : 1500
        );
      }, [anchor]);

      //console.log(newDirection.current ? "reverse" : "forward", visible, anchor);

      return (
        <Spring
          native
          to={{
            alpha: visible,
            scale: currentDirection.current
              ? [-visible, visible]
              : [visible, visible],
          }}
          config={spring}
        >
          {(props) => (
            <>
              <Sprite
                anchor={[0.5, 0.5]}
                image={indicator}
                scale={props.scale}
                alpha={props.alpha}
                position={[40, 88]}
              />
              <Sprite
                anchor={[0.5, 1]}
                image={avatar}
                scale={props.scale}
                alpha={props.alpha}
                position={[40, 100]}
              />
            </>
          )}
        </Spring>
      );
    };
    return <Animated />;
  },
  (prevProps, nextProps) => {
    /*
    console.log(
      prevProps.anchor,
      nextProps.anchor,
      prevProps.anchor.x === nextProps.anchor.x ||
        prevProps.anchor.y === nextProps.anchor.y
    );
    */
    return (
      prevProps.anchor.x === nextProps.anchor.x ||
      prevProps.anchor.y === nextProps.anchor.y
    );
  }
);

export default Avatar;

import React, { memo, useCallback, useState } from "react";
import { Spring } from "react-spring";
import { Container, Graphics } from "@inlet/react-pixi/animated";
import { Text } from "@inlet/react-pixi";
import { useDispatch, useSelector } from "react-redux";
import { setAvatarPosition } from "../../../redux/features/map/avatar";
import { setTransition } from "../../../redux/features/transition";
import { setSection } from "../../../redux/features/general";

const Label = memo(
  (props) => {
    const spring = { mass: 8, tension: 1000, friction: 100 };
    const { x, y, text, width, avatarPosition, zIndex, section } = props;
    const currentAvatarPosition = useSelector(
      (state) => state.avatar.avatarPosition
    );
    const { disabled } = props;

    //console.log(props);

    const label = useCallback(
      (g) => {
        g.clear();

        g.beginFill(disabled ? 0xb6bbcf : 0xe9993e, 1);
        g.drawRect(42, 4, width, 84);
        g.drawCircle(42, 46, 42);
        g.drawCircle(width + 42, 46, 42);
        g.endFill();
      },
      [width]
    );

    const labelBack = React.useCallback(
      (g) => {
        g.clear();

        g.beginFill(disabled ? 0xa4a9ba : 0xd57c16, 1);
        g.drawRect(50, 0, width, 84);
        g.drawCircle(50, 42, 42);
        g.drawCircle(width + 50, 42, 42);
        g.endFill();
      },
      [width]
    );
    const labelHover = React.useCallback(
      (g) => {
        g.clear();

        //ffdbae
        g.beginFill(disabled ? 0xc6cce1 : 0xffc375, 1);
        g.drawRect(50, -20, width, 124);
        g.drawCircle(50, 42, 62);
        g.drawCircle(width + 50, 42, 62);
        g.drawRect(42, -16, width, 124);
        g.drawCircle(42, 46, 62);
        g.drawCircle(width + 42, 46, 62);
        g.endFill();
      },
      [width]
    );

    const Hover = (props) => (
      <Spring native to={props} config={spring}>
        {(props) => <Graphics {...props} draw={labelHover} />}
      </Spring>
    );

    const Animated = () => {
      const dispatch = useDispatch();
      const [hover, setHover] = useState({
        scale: 0.6,
        x: width + 84 / 2 - (width + 84) * 0.6,
        y: 88 / 2 - (88 / 2) * 0.6,
      });
      const [pressed, setPressed] = useState({ isPressed: false, x: 0, y: 0 });

      const mouseOver = () => {
        setHover({ scale: 1, x: 0, y: 0 });

        if (
          currentAvatarPosition.x !== avatarPosition.x &&
          currentAvatarPosition.y !== avatarPosition.y
        ) {
          dispatch(setAvatarPosition(avatarPosition));
        }
      };

      const mouseLeave = () =>
        setHover({
          scale: 0.6,
          x: width + 84 / 2 - (width + 84) * 0.6,
          y: 88 / 2 - (88 / 2) * 0.6,
        });

      const handlePress = () => {
        if (!pressed.isPressed) {
          setPressed({ isPressed: true, x: 7, y: -3 });
        } else {
          setPressed({ isPressed: false, x: 0, y: 0 });
          if (!disabled) dispatch(setTransition(true));
          setTimeout(() => {
            if (!disabled) dispatch(setSection(section));
          }, 1000);
        }
      };

      //console.log(hover.scale);
      return (
        <Container
          x={x}
          y={y}
          skew={{ x: 0, y: 0.52 }}
          zIndex={zIndex}
          pivot={[width + 84, 84]}
          scale={0.8}
        >
          <Hover {...hover} />
          <Graphics draw={labelBack} cursor={"pointer"} />
          <Spring native to={pressed} config={spring}>
            {(props) => (
              <Container {...props}>
                <Graphics
                  draw={label}
                  interactive={true}
                  mouseover={mouseOver}
                  mouseout={mouseLeave}
                  pointerdown={handlePress}
                  pointerup={handlePress}
                  cursor={"pointer"}
                />
                <Text
                  text={text + (disabled ? "\n(PRÓXIMAMENTE)" : "")}
                  x={(width + 84) / 2}
                  y={88 / 2}
                  anchor={0.5}
                  style={{
                    align: "center",
                    fill: "#ffffff",
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                />
              </Container>
            )}
          </Spring>
        </Container>
      );
    };

    return <Animated />;
  },
  (prevProps, nextProps) => prevProps !== nextProps
);

export default Label;

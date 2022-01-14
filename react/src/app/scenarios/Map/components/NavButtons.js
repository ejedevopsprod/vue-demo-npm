import React, { memo, useEffect, useState } from "react";
import { Container, Graphics, Sprite } from "@inlet/react-pixi/animated";
import { Spring } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { moveMap } from "../../../redux/features/map/map";

const NavButtons = memo(() => {
  const config = { mass: 8, tension: 1500, friction: 100 };
  const dispatch = useDispatch();

  const button = React.useCallback((g) => {
    g.clear();

    g.beginFill(0xd60057, 1);
    g.drawCircle(0, 0, 40);
    g.endFill();
    g.lineStyle({
      width: 5,
      color: 0xffffff,
      join: "round",
    });
    g.beginFill(0xffffff, 1);
    g.moveTo(-20, 8);
    g.lineTo(0, -12);
    g.lineTo(0, -11);
    g.lineTo(-20, 9);
    g.lineTo(-20, 8);
    g.closePath();
    g.moveTo(20, 8);
    g.lineTo(0, -12);
    g.lineTo(0, -11);
    g.lineTo(20, 9);
    g.lineTo(20, 8);
    g.closePath();
    g.endFill();
  }, []);

  const buttonBack = React.useCallback((g) => {
    g.clear();

    //window.innerWidth / 30 > 25 ? window.innerWidth / 30 : 25
    g.beginFill(0xc40050, 1);
    g.drawCircle(4, 2, 40);
    g.endFill();
  }, []);

  const Animated = (props) => {
    const scale = window.innerWidth / 1536;
    const { click, x, y } = props;
    const { mapPosition, mapSize, isMapActive } = useSelector(
      (state) => state.map
    );
    const [isVisible, setVisible] = useState({
      up: true,
      down: true,
      left: true,
      right: true,
    });
    const [pressed, setPressed] = useState({
      isPressed: false,
      x: props.x,
      y: props.y,
    });

    const handlePress = () => {
      if (!pressed.isPressed) {
        setPressed({ isPressed: true, x: props.x + 4, y: props.y + 2 });
      } else {
        setPressed({ isPressed: false, x: props.x, y: props.y });
      }
    };

    useEffect(() => {
      setVisible({
        up: mapPosition.y !== (window.innerHeight / 2) * -0.01,
        down:
          mapPosition.y !==
          -(mapSize.height - window.innerHeight) +
            (window.innerHeight / 2) * 0.01,
        left: mapPosition.x !== (window.innerWidth / 2) * -0.01,
        right:
          mapPosition.x !==
          -(mapSize.width - window.innerWidth) + (window.innerWidth / 2) * 0.01,
      });
    }, [mapPosition, mapSize]);

    return (
      <Spring
        to={{
          ...props,
          ...pressed,
          ...{
            scale: isVisible[props.direction] && isMapActive ? 1 * scale : 0,
          },
          ...{ alpha: isVisible[props.direction] && isMapActive ? 1 : 0 },
        }}
        config={config}
      >
        {(props) => (
          <Container
            interactive={true}
            cursor={"pointer"}
            pointerdown={handlePress}
            pointerup={() => {
              handlePress();
              click();
            }}
          >
            <Graphics
              x={x}
              y={y}
              angle={0}
              draw={buttonBack}
              scale={props.scale}
              alpha={props.alpha}
            />
            <Graphics {...props} draw={button} />
          </Container>
        )}
      </Spring>
    );
  };

  const handleClick = (direction) => {
    switch (direction) {
      case "up":
        dispatch(moveMap({ x: 0, y: 150 }));
        break;
      case "down":
        dispatch(moveMap({ x: 0, y: -150 }));
        break;
      case "left":
        dispatch(moveMap({ x: 150, y: 0 }));
        break;
      case "right":
        dispatch(moveMap({ x: -150, y: 0 }));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Animated
        click={() => handleClick("up")}
        direction={"up"}
        x={window.innerWidth / 2}
        y={50}
        angle={0}
      />
      <Animated
        click={() => handleClick("down")}
        direction={"down"}
        x={window.innerWidth / 2}
        y={window.innerHeight - 52}
        angle={180}
      />
      <Animated
        click={() => handleClick("left")}
        direction={"left"}
        x={50}
        y={window.innerHeight / 2}
        angle={270}
      />
      <Animated
        click={() => handleClick("right")}
        direction={"right"}
        x={window.innerWidth - 54}
        y={window.innerHeight / 2}
        angle={90}
      />
    </>
  );
});

export default NavButtons;

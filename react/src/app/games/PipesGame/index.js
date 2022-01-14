import { Container, Sprite } from "@inlet/react-pixi/animated";
import { Spring } from "@react-spring/core";
import React, { useEffect, useRef, useState } from "react";
import rasterizeSVG from "../../utils/rasterizeSVG";
import template from "../../assets/games/pipesGame/juego5_v4.png";
import pt1 from "../../assets/games/pipesGame/pt1";
import pt11 from "../../assets/games/pipesGame/pt11";
import pt7 from "../../assets/games/pipesGame/pt7";
import pt9 from "../../assets/games/pipesGame/pt9";
import pt13 from "../../assets/games/pipesGame/pt13";
import pt5 from "../../assets/games/pipesGame/pt5";
import pt2 from "../../assets/games/pipesGame/pt2";
import ProgressBar from "../../baseComponents/ProgressBar";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import gameOk from "../../assets/games/pipesGame/juego5_ganar.png";
import gameWrong from "../../assets/games/pipesGame/juego5_perder.png";

export default function Index({ visible, close, reset }) {
  const config = { mass: 8, tension: 1500, friction: 150 };
  const Animated = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [message, setMessage] = useState({ status: false, visible: false });
    const TIME_LIMIT = 20;
    const [curve1, setCurve1] = useState({ angle: 180, scale: 1 });
    const [curve2, setCurve2] = useState({ angle: 90, scale: 1 });
    const [curve3, setCurve3] = useState({ angle: 0, scale: 1 });
    const [curve4, setCurve4] = useState({ angle: 180, scale: 1 });
    const [curve5, setCurve5] = useState({ angle: 180, scale: 1 });
    const [curve6, setCurve6] = useState({ angle: 270, scale: 1 });

    useEffect(() => {
      if (
        !(
          curve1.angle % 360 === 0 &&
          curve2.angle % 360 === 180 &&
          curve3.angle % 360 === 90 &&
          curve4.angle % 360 === 270 &&
          curve5.angle % 360 === 0 &&
          curve6.angle % 360 === 180
        )
      ) {
        if (visible) {
          updateTime();
        } else {
          setCurrentTime(0);
        }
      }
    }, [currentTime, visible]);

    const updateTime = () => {
      if (currentTime < TIME_LIMIT) {
        setTimeout(() => {
          setCurrentTime(currentTime + 1);
        }, 1000);
      } else {
        setMessage({ status: false, visible: true });
      }
    };

    const handleMouseDown = (key) => {
      switch (key) {
        case 1:
          setCurve1({ angle: curve1.angle + 90, scale: 0.8 });
          break;
        case 2:
          setCurve2({ angle: curve2.angle + 90, scale: 0.8 });
          break;
        case 3:
          setCurve3({ angle: curve3.angle + 90, scale: 0.8 });
          break;
        case 4:
          setCurve4({ angle: curve4.angle + 90, scale: 0.8 });
          break;
        case 5:
          setCurve5({ angle: curve5.angle + 90, scale: 0.8 });
          break;
        case 6:
          setCurve6({ angle: curve6.angle + 90, scale: 0.8 });
          break;

        default:
          break;
      }
    };

    const handleMouseUp = (key) => {
      switch (key) {
        case 1:
          setCurve1({ angle: curve1.angle, scale: 1 });
          break;
        case 2:
          setCurve2({ angle: curve2.angle, scale: 1 });
          break;
        case 3:
          setCurve3({ angle: curve3.angle, scale: 1 });
          break;
        case 4:
          setCurve4({ angle: curve4.angle, scale: 1 });
          break;
        case 5:
          setCurve5({ angle: curve5.angle, scale: 1 });
          break;
        case 6:
          setCurve6({ angle: curve6.angle, scale: 1 });
          break;

        default:
          break;
      }

      setTimeout(() => {
        if (
          curve1.angle % 360 === 0 &&
          curve2.angle % 360 === 180 &&
          curve3.angle % 360 === 90 &&
          curve4.angle % 360 === 270 &&
          curve5.angle % 360 === 0 &&
          curve6.angle % 360 === 180
        ) {
          setMessage({ status: true, visible: true });
        }
      }, 500);
    };

    const closeDialog = () => {
      if (message.status) {
        close(3);
      } else {
        switch (true) {
          case curve1.angle % 360 !== 0 || curve2.angle % 360 !== 180:
            close(0);
            break;
          case curve3.angle % 360 !== 90 || curve4.angle % 360 !== 270:
            close(1);
            break;
          case curve5.angle % 360 !== 0:
            close(2);
            break;

          default:
            break;
        }
        setCurve1({ angle: curve1.angle, scale: 1 });
        setCurve2({ angle: curve1.angle, scale: 1 });
        setCurve3({ angle: curve1.angle, scale: 1 });
        setCurve4({ angle: curve1.angle, scale: 1 });
        setCurve5({ angle: curve1.angle, scale: 1 });
        setCurve6({ angle: curve1.angle, scale: 1 });
        setTimeout(() => {
          message.visible = false;
          setMessage({ ...message });
        }, 1000);
      }
    };

    return (
      <Spring
        config={config}
        to={{
          angle1: curve1.angle,
          angle2: curve2.angle,
          angle3: curve3.angle,
          angle4: curve4.angle,
          angle5: curve5.angle,
          angle6: curve6.angle,
          scale1: curve1.scale,
          scale2: curve2.scale,
          scale3: curve3.scale,
          scale4: curve4.scale,
          scale5: curve5.scale,
          scale6: curve6.scale,
        }}
      >
        {(props) => (
          <>
            <Container
              pivot={[-window.innerWidth / 2, -window.innerHeight / 2]}
              scale={message.visible ? 0 : 1}
              alpha={message.visible ? 0 : 1}
            >
              <Sprite image={template} anchor={0.5} scale={0.7} />
              <Sprite
                image={rasterizeSVG(pt1, [231, 231])}
                anchor={0.5}
                position={[-408, -63]}
              />
              <Sprite
                image={rasterizeSVG(pt11, [142, 142])}
                anchor={0.5}
                position={[-222, 57]}
              />
              <Sprite
                image={rasterizeSVG(pt11, [142, 142])}
                anchor={0.5}
                position={[215, 5.8]}
              />
              <Sprite
                image={rasterizeSVG(pt7, [190, 190])}
                anchor={0.5}
                position={[-11, 31]}
              />
              <Sprite
                image={rasterizeSVG(pt9, [90, 125])}
                anchor={0.5}
                position={[100, -133]}
              />
              <Sprite
                image={rasterizeSVG(pt5, [75, 75])}
                anchor={0.5}
                position={[-115, 196]}
              />
              <Sprite
                image={rasterizeSVG(pt13, [231, 231])}
                anchor={0.5}
                position={[401, 160]}
              />
              <Sprite
                image={rasterizeSVG(pt2, [99, 99])}
                anchor={[0.577298598, 0.431273822]}
                position={[-236, -71]}
                interactive
                angle={props.angle1}
                scale={props.scale1}
                mousedown={() => handleMouseDown(1)}
                mouseup={() => handleMouseUp(1)}
                cursor={"pointer"}
              />
              <Sprite
                image={rasterizeSVG(pt2, [99, 99])}
                anchor={[0.577298598, 0.431273822]}
                position={[-209, 183]}
                interactive
                angle={props.angle2}
                scale={props.scale2}
                mousedown={() => handleMouseDown(2)}
                mouseup={() => handleMouseUp(2)}
                cursor={"pointer"}
              />
              <Sprite
                image={rasterizeSVG(pt2, [99, 99])}
                anchor={[0.577298598, 0.431273822]}
                position={[-23, 183]}
                interactive
                angle={props.angle3}
                scale={props.scale3}
                mousedown={() => handleMouseDown(3)}
                mouseup={() => handleMouseUp(3)}
                cursor={"pointer"}
              />
              <Sprite
                image={rasterizeSVG(pt2, [99, 99])}
                anchor={[0.577298598, 0.431273822]}
                position={[0, -120]}
                interactive
                angle={props.angle4}
                scale={props.scale4}
                mousedown={() => handleMouseDown(4)}
                mouseup={() => handleMouseUp(4)}
                cursor={"pointer"}
              />
              <Sprite
                image={rasterizeSVG(pt2, [99, 99])}
                anchor={[0.577298598, 0.431273822]}
                position={[202, -120]}
                interactive
                angle={props.angle5}
                scale={props.scale5}
                mousedown={() => handleMouseDown(5)}
                mouseup={() => handleMouseUp(5)}
                cursor={"pointer"}
              />
              <Sprite
                image={rasterizeSVG(pt2, [99, 99])}
                anchor={[0.577298598, 0.431273822]}
                position={[228, 133]}
                interactive
                angle={props.angle6}
                scale={props.scale6}
                mousedown={() => handleMouseDown(6)}
                mouseup={() => handleMouseUp(6)}
                cursor={"pointer"}
              />
              <ProgressBar
                value={currentTime}
                limit={TIME_LIMIT}
                x={-250}
                y={-530}
              />
            </Container>
            {message.visible && (
              <GameDialog
                image={message.status ? gameOk : gameWrong}
                button={"Continuar"}
                close={closeDialog}
                scale={message.visible ? 1 : 0}
                alpha={message.visible ? 1 : 0}
              />
            )}
          </>
        )}
      </Spring>
    );
  };
  return <Animated />;
}
//[210, -110]

import { Container, Graphics, Sprite } from "@inlet/react-pixi/animated";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProgressBar from "../../baseComponents/ProgressBar";
import rasterizeSVG from "../../utils/rasterizeSVG";
import doc_vacio from "../../assets/games/formGame/doc_vacio";
import circulo_naranja from "../../assets/games/formGame/circulo_naranja";
import erro1 from "../../assets/games/formGame/erro1";
import erro2 from "../../assets/games/formGame/erro2";
import erro3 from "../../assets/games/formGame/erro3";
import firma from "../../assets/games/formGame/firma";
import IMSS from "../../assets/games/formGame/imss";
import linea_firma from "../../assets/games/formGame/linea_firma";
import texto1 from "../../assets/games/formGame/texto1";
import texto2 from "../../assets/games/formGame/texto2";
import solicitud from "../../assets/games/formGame/solicitud";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import gameOk from "../../assets/games/formGame/ganarjuego4.png";
import gameWrong from "../../assets/games/formGame/perderjuego4.png";

export default function Index({ visible, close, reset }) {
  const Animated = () => {
    const scale = window.innerWidth / 1536;
    const [message, setMessage] = useState({ status: false, visible: false });
    const [currentTime, setCurrentTime] = useState(0);
    const [selected, setSelected] = useState(-1);
    const [mousePosition, setMousePosition] = useState([0, 0]);
    const TIME_LIMIT = 20;
    const placed = useRef(0);

    const [draggables, setDraggables] = useState([
      {
        initPos: [-400, 0],
        finalPos: [77, 127],
        state: false,
        isDragging: false,
      },
      {
        initPos: [400, 0],
        finalPos: [400, 0],
        state: false,
        isDragging: false,
      },
      {
        initPos: [-300, -150],
        finalPos: [-300, -150],
        state: false,
        isDragging: false,
      },
      {
        initPos: [-270, 0],
        finalPos: [-270, 0],
        state: false,
        isDragging: false,
      },
      {
        initPos: [270, 0],
        finalPos: [-143, -158],
        state: false,
        isDragging: false,
      },
      {
        initPos: [350, -200],
        finalPos: [350, -200],
        state: false,
        isDragging: false,
      },
      {
        initPos: [-400, -200],
        finalPos: [-87, 140],
        state: false,
        isDragging: false,
      },
      {
        initPos: [-350, 150],
        finalPos: [-30, -63],
        state: false,
        isDragging: false,
      },
      {
        initPos: [350, -120],
        finalPos: [-24, 30],
        state: false,
        isDragging: false,
      },
      {
        initPos: [350, 120],
        finalPos: [-23, -170],
        state: false,
        isDragging: false,
      },
    ]);

    const container = useCallback((g) => {
      g.clear();

      g.beginFill(0xffffff, 0.00000001);
      g.drawRect(
        -window.innerWidth / 2 / scale,
        -window.innerHeight / 2 / scale,
        window.innerWidth / scale,
        window.innerHeight / scale
      );
      g.endFill();
    });

    const imssShadow = useCallback((g) => {
      g.clear();

      g.beginFill(0xffffff, 0.00000001);
      g.drawRect(-135, -200, 30, 40);
      g.endFill();
    });

    const text1Shadow = useCallback((g) => {
      g.clear();

      g.beginFill(0xffffff, 0.00000001);
      g.drawRect(-130, -120, 215, 110);
      g.endFill();
    });

    const text2Shadow = useCallback((g) => {
      g.clear();

      g.beginFill(0xffffff, 0.00000001);
      g.drawRect(-130, 0, 215, 50);
      g.endFill();
    });

    const signShadow = useCallback((g) => {
      g.clear();

      g.beginFill(0xffffff, 0.00000001);
      g.drawCircle(-95, 145, 40);
      g.endFill();
    });

    const stampShadow = useCallback((g) => {
      g.clear();

      g.beginFill(0xffffff, 0.00000001);
      g.drawCircle(77, 127, 40);
      g.endFill();
    });

    const titleShadow = useCallback((g) => {
      g.clear();

      g.beginFill(0x000, 0.00000001);
      g.drawRect(-87, -193, 160, 40);
      g.endFill();
    });

    useEffect(() => {
      if (placed.current < 6) {
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

    const handleMouse = (e) => {
      setMousePosition([
        (e.data.global.x - window.innerWidth / 2) / scale,
        (e.data.global.y - window.innerHeight / 2) / scale,
      ]);
    };

    const handleMouseDown = (i) => {
      draggables[i].isDragging = true;
      setDraggables([...draggables]);
      setSelected(i);
    };

    const placeDraggable = (i) => {
      if (selected + 1 && i === selected) {
        draggables[selected].isDragging = false;
        draggables[selected].state = true;
        setDraggables([...draggables]);
        setSelected(-1);
        placed.current++;
        if (placed.current === 6) {
          setTimeout(() => {
            setMessage({ status: true, visible: true });
          }, 500);
        }
      } else {
        handleMouseUp();
      }
    };

    const handleMouseUp = () => {
      if (selected + 1) {
        draggables[selected].isDragging = false;
        setDraggables([...draggables]);
        setSelected(-1);
      }
    };

    const closeDialog = () => {
      if (message.status) {
        close(4);
      } else {
        setSelected(-1);
        setDraggables([
          ...draggables.map((e) => {
            e.state = false;
            e.isDragging = false;
            return e;
          }),
        ]);
        placed.current = 0;
        close(Math.round(Math.random() * 3.5));
        setTimeout(() => {
          message.visible = false;
          setMessage({ ...message });
        }, 1000);
      }
    };

    return (
      <>
        <Container
          scale={message.visible ? 0 : 1}
          alpha={message.visible ? 0 : 1}
          pivot={[-window.innerWidth / 2, -window.innerHeight / 1.8]}
          interactive
        >
          <Sprite image={rasterizeSVG(doc_vacio, [450, 450])} anchor={0.5} />

          <Graphics
            draw={container}
            interactive
            mousemove={handleMouse}
            mouseup={handleMouseUp}
          />
          <Graphics
            draw={stampShadow}
            interactive
            mouseup={() => placeDraggable(0)}
          />
          <Graphics
            draw={imssShadow}
            interactive
            rotation={25}
            mouseup={() => placeDraggable(4)}
          />
          <Graphics
            draw={signShadow}
            interactive
            mouseup={() => placeDraggable(6)}
          />
          <Graphics
            draw={text1Shadow}
            interactive
            rotation={25.04}
            mouseup={() => placeDraggable(7)}
          />
          <Graphics
            draw={text2Shadow}
            interactive
            rotation={25.04}
            mouseup={() => placeDraggable(8)}
          />
          <Graphics
            draw={titleShadow}
            interactive
            rotation={25.04}
            mouseup={() => placeDraggable(9)}
          />

          <Container>
            <Sprite
              image={rasterizeSVG(circulo_naranja, [100, 100])}
              anchor={0.5}
              position={
                draggables[0].state
                  ? draggables[0].finalPos
                  : draggables[0].isDragging
                  ? [mousePosition[0], mousePosition[1] - 50 * scale]
                  : draggables[0].initPos
              }
              scale={selected === 0 && !draggables[0].state ? 1 : 0.8}
              interactive={!(selected + 1)}
              mousedown={() => handleMouseDown(0)}
            />
          </Container>

          <Sprite
            image={rasterizeSVG(erro1, [100, 100])}
            anchor={0.5}
            position={
              draggables[1].state
                ? draggables[1].finalPos
                : draggables[1].isDragging
                ? [mousePosition[0], mousePosition[1] - 50 * scale]
                : draggables[1].initPos
            }
            scale={selected === 1 && !draggables[1].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(1)}
          />
          <Sprite
            image={rasterizeSVG(erro2, [100, 100])}
            anchor={0.5}
            position={
              draggables[2].state
                ? draggables[2].finalPos
                : draggables[2].isDragging
                ? [mousePosition[0], mousePosition[1] - 50 * scale]
                : draggables[2].initPos
            }
            scale={selected === 2 && !draggables[2].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(2)}
          />
          <Sprite
            image={rasterizeSVG(erro3, [100, 100])}
            anchor={0.5}
            position={
              draggables[3].state
                ? draggables[3].finalPos
                : draggables[3].isDragging
                ? [mousePosition[0], mousePosition[1] - 50 * scale]
                : draggables[3].initPos
            }
            scale={selected === 3 && !draggables[3].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(3)}
          />
          <Sprite
            image={rasterizeSVG(IMSS, [60, 60])}
            anchor={0.5}
            position={
              draggables[4].state
                ? draggables[4].finalPos
                : draggables[4].isDragging
                ? [mousePosition[0], mousePosition[1] - 30 * scale]
                : draggables[4].initPos
            }
            scale={selected === 4 && !draggables[4].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(4)}
          />
          <Sprite
            image={rasterizeSVG(firma, [90, 90])}
            anchor={0.5}
            position={
              draggables[6].state
                ? draggables[6].finalPos
                : draggables[6].isDragging
                ? [mousePosition[0], mousePosition[1] - 45 * scale]
                : draggables[6].initPos
            }
            scale={selected === 6 && !draggables[6].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(6)}
          />
          <Sprite
            image={rasterizeSVG(texto1, [265, 265])}
            anchor={0.5}
            position={
              draggables[7].state
                ? draggables[7].finalPos
                : draggables[7].isDragging
                ? [mousePosition[0], mousePosition[1] - 50 * scale]
                : draggables[7].initPos
            }
            scale={selected === 7 && !draggables[7].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(7)}
          />
          <Sprite
            image={rasterizeSVG(texto2, [265, 265])}
            anchor={0.5}
            position={
              draggables[8].state
                ? draggables[8].finalPos
                : draggables[8].isDragging
                ? [mousePosition[0], mousePosition[1] - 40 * scale]
                : draggables[8].initPos
            }
            scale={selected === 8 && !draggables[8].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(8)}
          />
          <Sprite
            image={rasterizeSVG(solicitud, [198, 198])}
            anchor={0.5}
            position={
              draggables[9].state
                ? draggables[9].finalPos
                : draggables[9].isDragging
                ? [mousePosition[0], mousePosition[1] - 50 * scale]
                : draggables[9].initPos
            }
            scale={selected === 9 && !draggables[9].state ? 1 : 0.8}
            interactive={!(selected + 1)}
            mousedown={() => handleMouseDown(9)}
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
    );
  };
  return <Animated />;
}

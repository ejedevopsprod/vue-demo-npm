import React, { useEffect, useRef, useState } from "react";
import { Sprite, Container } from "@inlet/react-pixi/animated";
import Label from "./components/Label";
import Avatar from "./components/Avatar";
import NavButtons from "./components/NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { setMapPosition, setMapSize } from "../../redux/features/map/map";
import useWindowSize from "../../utils/useWindowSize";
import { Spring } from "react-spring";
import isometricCalc from "../../utils/isometricCalc";

import background from "../../assets/map/background.png";
import path from "../../assets/map/path.png";
import prestamo from "../../assets/map/places/prestamo.png";
import transicion from "../../assets/map/places/transicion.png";
import contratacion from "../../assets/map/places/contratacion.png";
import pensiones from "../../assets/map/places/pensiones.png";
import servicios from "../../assets/map/places/servicios.png";
import tree1 from "../../assets/map/trees/tree1.png";
import blobs1 from "../../assets/blobs/blobs1.png";
import Walking from "./components/Walking";
import { setTransition } from "../../redux/features/transition";
import useScale from "../../utils/useScale";

export default function Map() {
  const spring = { mass: 1, tension: 150, friction: 50 };
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const scale = useScale();

  useEffect(() => {
    dispatch(
      setMapSize({
        width: 2150 * scale,
        height: 1400 * scale,
      })
    );
    dispatch(setTransition(false));
  }, []);

  useEffect(() => {
    dispatch(
      setMapSize({
        width: 2150 * scale,
        height: 1400 * scale,
      })
    );
  }, [windowSize]);

  const Animated = () => {
    const { mapPosition, isMapActive } = useSelector((state) => state.map);
    const { userWorlds } = useSelector((state) => state.user);
    const [isDragging, setDragging] = useState(false);
    const mouseDown = useRef();
    //const [l, setL] = useState({});
    const [mapTransform, setMapTransform] = useState({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    useEffect(() => {
      dispatch(
        setMapPosition({
          x:
            (window.innerWidth / 2) * -0.01 +
            (isMapActive ? 0 : window.innerWidth * 0.45),
          y:
            -(1400 * scale - window.innerHeight) -
            (window.innerHeight / 2) * -0.01 -
            (isMapActive ? 0 : 150),
        })
      );
    }, []);

    const onMouseDown = (e) => {
      setDragging(true);
      mouseDown.current = { x: e.data.global.x, y: e.data.global.y };
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        mouseDown.current = { x: e.data.global.x, y: e.data.global.y };
      } else {
        setMapTransform({
          x:
            -(e.data.global.x - window.innerWidth / 2) * 0.01 +
            window.innerWidth / 2,
          y:
            -(e.data.global.y - window.innerHeight / 2) * 0.01 +
            window.innerHeight / 2,
        });
      }
    };

    return (
      <>
        <Spring native to={{ ...mapPosition }} config={spring}>
          {(props) => (
            <Spring {...mapTransform}>
              {(transform) => (
                <Container
                  {...transform}
                  config={{ duration: 0 }}
                  pivot={[window.innerWidth / 2, window.innerHeight / 2]}
                >
                  <Container
                    {...props}
                    scale={scale}
                    sortableChildren={true}
                    interactive={isMapActive}
                    pointermove={onMouseMove}
                    pointerdown={onMouseDown}
                    pointerup={() => setDragging(false)}
                  >
                    <Sprite image={background} x={30} y={35} zIndex={-10000} />
                    <Avatar {...isometricCalc(1122, 700)} />
                    <Sprite
                      image={tree1}
                      {...isometricCalc(835, 565)}
                      alpha={0}
                    />
                    {false && (
                      <Sprite
                        image={blobs1}
                        x={-470}
                        y={-600}
                        zIndex={-20000}
                      />
                    )}
                    <Sprite image={path} x={-479} y={-339} zIndex={-15000} />

                    <Sprite
                      image={prestamo}
                      {...isometricCalc(1038, -620)}
                      anchor={[0.5, 1]}
                      alpha={0}
                    />
                    <Label
                      {...isometricCalc(1340, -355)}
                      text={
                        "¿CÓMO PUEDO APOYAR A MI FAMILIA\nSI SOLO TENGO MI PENSIÓN?"
                      }
                      width={350}
                      avatarPosition={{ ...isometricCalc(1250, -245) }}
                      section={"map"}
                      disabled={userWorlds[3] && !userWorlds[3].active}
                    />

                    <Sprite
                      image={servicios}
                      {...isometricCalc(1470, -270)}
                      anchor={[0.5, 1]}
                      alpha={0}
                    />
                    <Label
                      {...isometricCalc(1720, 20)}
                      text={"¿QUÉ TENGO QUE HACER\nPARA PENSIONARME?"}
                      width={230}
                      avatarPosition={{ ...isometricCalc(1560, 92) }}
                      section={"map"}
                      disabled={userWorlds[3] && !userWorlds[3].active}
                    />

                    <Sprite
                      image={pensiones}
                      {...isometricCalc(595, -285)}
                      anchor={[0.5, 1]}
                      alpha={0}
                    />
                    <Label
                      {...isometricCalc(1000, -70)}
                      text={
                        "SOY VIUDA ¿CÓMO HAGO PARA QUE LE\nSIGAN PAGANDO LA PENSIÓN A MIS HIJOS?"
                      }
                      width={400}
                      avatarPosition={{ ...isometricCalc(950, 30) }}
                      section={"map"}
                      disabled={userWorlds[3] && !userWorlds[3].active}
                    />

                    <Sprite
                      image={contratacion}
                      {...isometricCalc(1337, 290)}
                      anchor={[0.4, 1.35]}
                      alpha={0}
                    />
                    <Label
                      {...isometricCalc(1470, 680)}
                      text={"¿DÓNDE ESTÁ MI AHORRO\nPARA EL RETIRO?"}
                      width={250}
                      avatarPosition={{ ...isometricCalc(1122, 700) }}
                      section={"registry"}
                    />

                    <Sprite
                      image={contratacion}
                      {...isometricCalc(1337, 290)}
                      anchor={[0.4, 1.35]}
                      alpha={0}
                    />
                    <Label
                      {...isometricCalc(1570, 360)}
                      text={"CON ESA PENSIÓN NO ME\nALCANZA, QUIERO MEJORARLA"}
                      width={290}
                      avatarPosition={{ ...isometricCalc(1570, 398) }}
                      disabled={userWorlds[3] && !userWorlds[3].active}
                    />

                    <Sprite
                      image={transicion}
                      {...isometricCalc(623, 263)}
                      anchor={[0.5, 1]}
                      alpha={0}
                    />
                    <Label
                      {...isometricCalc(1050, 422)}
                      text={"NECESITO CONSEGUIR DINERO,\nME QUEDÉ SIN EMPLEO"}
                      width={290}
                      avatarPosition={{ ...isometricCalc(1122, 530) }}
                      section={"withdrawals"}
                    />
                  </Container>
                </Container>
              )}
            </Spring>
          )}
        </Spring>
        <NavButtons />
      </>
    );
  };

  return <Animated />;
}

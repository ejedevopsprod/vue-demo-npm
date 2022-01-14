import { Container, Graphics, Sprite, Text } from "@inlet/react-pixi/animated";
import { TextStyle } from "pixi.js";
import { Spring } from "react-spring";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const GameDialog = memo(
  ({
    image,
    close,
    scale = 1,
    alpha = 1,
    button,
    buttonPosition = [
      window.innerWidth / 2 - 450,
      window.innerHeight / 2 + 100,
    ],
    showSkip,
    skip,
  }) => {
    const spring = { mass: 6, tension: 1000, friction: 100 };
    const Animated = () => {
      const [isBtnActive, setBtnActive] = useState(false);
      const [firstRender, setFirstRender] = useState(3);
      const text = useRef();
      const [textWidth, setTextWidth] = useState();
      const [visible, setVisible] = useState(scale);
      const container = useCallback((g) => {
        g.clear();
        g.lineStyle(1.5, 0xe8993d, 1);
        g.beginFill(0xffffff, 1);
        g.drawRoundedRect(
          0,
          0,
          window.innerWidth - 250,
          window.innerHeight - 150,
          40
        );
        g.endFill();
      });

      const label = useCallback((g) => {
        g.clear();
        g.beginFill(0xe8993d, 1);
        g.drawRoundedRect(0, 0, textWidth + 50, 35, 40);
        g.endFill();
      });

      const labelBack = useCallback((g) => {
        g.clear();
        g.beginFill(0xd67d17, 1);
        g.drawRoundedRect(0, 0, textWidth + 50, 35, 40);
        g.endFill();
      });

      useEffect(() => {
        setTextWidth(text.current.width);
      });

      useEffect(() => {
        setVisible(scale);
      }, [scale]);

      useEffect(() => {
        if (firstRender > 0) setFirstRender(firstRender - 1);
      }, [firstRender]);

      const btnDown = (id) => {
        setBtnActive(true);
      };

      const btnUp = (id) => {
        setTimeout(() => {
          setBtnActive(false);
          //setVisible(0);
        }, 50);
        setTimeout(() => {
          //action(id);
          setVisible(0);
        }, 500);
        setTimeout(() => {
          close();
          setVisible(1);
        }, 1000);
      };

      const skipDown = (id) => {
        setBtnActive(true);
      };

      const skipUp = (id) => {
        setTimeout(() => {
          setBtnActive(false);
          //setVisible(0);
        }, 50);
        setTimeout(() => {
          //action(id);
          setVisible(0);
        }, 500);
        setTimeout(() => {
          skip();
          setVisible(1);
        }, 1000);
      };

      return (
        <Spring
          from={{ x: 0, y: 0, scale: visible ? 0 : 1, alpha: visible ? 0 : 1 }}
          to={{ x: 0, y: 0, scale: visible, alpha: visible }}
          config={spring}
        >
          {(props) => (
            <Container
              scale={props.scale}
              alpha={props.alpha}
              pivot={[window.innerWidth / 2, window.innerHeight / 2]}
              position={[window.innerWidth / 2, window.innerHeight / 2]}
            >
              {image && (
                <Sprite
                  image={image}
                  scale={0.7}
                  anchor={0.5}
                  position={[window.innerWidth / 2, window.innerHeight / 2]}
                />
              )}
              <Container
                position={buttonPosition}
                interactive="true"
                cursor="pointer"
                pointerdown={btnDown}
                pointerup={btnUp}
              >
                <Graphics draw={(g) => labelBack(g)} />
                <Container
                  x={isBtnActive ? props.x : -2}
                  y={isBtnActive ? props.y : -4}
                >
                  <Graphics draw={(g) => label(g)} />
                  <Text
                    ref={text}
                    text={button || "Jugar"}
                    x={25}
                    y={9}
                    style={
                      new TextStyle({
                        fontFamily: "Poppins-Bold",
                        fontSize: 14,
                        fontWeight: "bold",
                        fill: "#fff",
                      })
                    }
                  />
                </Container>
              </Container>

              {showSkip && (
                <Container
                  position={[
                    window.innerWidth / 2 - 450,
                    window.innerHeight / 2 + 170,
                  ]}
                  interactive="true"
                  cursor="pointer"
                  pointerdown={skipDown}
                  pointerup={skipUp}
                >
                  <Graphics draw={(g) => labelBack(g)} />
                  <Container
                    x={isBtnActive ? props.x : -2}
                    y={isBtnActive ? props.y : -4}
                  >
                    <Graphics draw={(g) => label(g)} />
                    <Text
                      ref={text}
                      text={"Saltar"}
                      x={25}
                      y={9}
                      style={
                        new TextStyle({
                          fontFamily: "Poppins-Bold",
                          fontSize: 14,
                          fontWeight: "bold",
                          fill: "#fff",
                        })
                      }
                    />
                  </Container>
                </Container>
              )}
            </Container>
          )}
        </Spring>
      );
    };

    return <Animated />;
  },
  (prevProps, nextProps) => prevProps.scale === nextProps.scale
);

export default GameDialog;

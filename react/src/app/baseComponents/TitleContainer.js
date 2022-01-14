import { Container, Graphics, Sprite, Text } from "@inlet/react-pixi/animated";
import { TextStyle } from "pixi.js";
import { Spring } from "@react-spring/core";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import gamesBg from "../assets/games/games_bg.png";
import { easeCubicInOut, easeQuadInOut } from "d3-ease";
import { useDispatch, useSelector } from "react-redux";
import { setVideo } from "../redux/features/video";

const TitleContainer = memo(
  ({
    image,
    scale = 1,
    close,
    isLast,
    video,
    onVideoVisible,
    buttonsPosition,
    comment = true,
  }) => {
    const spring = { mass: 6, tension: 1000, friction: 100 };
    const relativeScale = window.innerWidth / 1536;
    const Animated = () => {
      const { played } = useSelector((state) => state.video);
      const [isBtnActive, setBtnActive] = useState(false);
      const [firstRender, setFirstRender] = useState(3);
      const text = useRef();
      const text2 = useRef();
      const [textWidth, setTextWidth] = useState();
      const [text2Width, setText2Width] = useState();
      const [visible, setVisible] = useState(scale);
      const [isVideoVisible, setVideoVisible] = useState(false);
      const [isCommentVisible, setCommentVisible] = useState(false);
      const mask = useRef();
      const dispatch = useDispatch();
      const commentDOM = document.querySelectorAll(".commentContainer > *");

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

      const label2 = useCallback((g) => {
        g.clear();
        g.beginFill(0xe8993d, 1);
        g.drawRoundedRect(0, 0, text2Width + 50, 35, 40);
        g.endFill();
      });

      const labelBack2 = useCallback((g) => {
        g.clear();
        g.beginFill(0xd67d17, 1);
        g.drawRoundedRect(0, 0, text2Width + 50, 35, 40);
        g.endFill();
      });

      useEffect(() => {
        document.querySelector(".commentContainer").style.opacity =
          isLast && isCommentVisible ? 1 : 0;
        return () => {
          setVisible(1);
        };
      }, []);

      useEffect(() => {
        setTextWidth(text.current.width);
        setText2Width(text2.current.width);
        document.querySelector(".commentContainer").style.transform =
          isLast && isCommentVisible
            ? "translate(-50% -50%) scale(1)"
            : "translate(-50% -50%) scale(0)";
        document.querySelector(".commentContainer").style.scale =
          !isLast && isVideoVisible ? 1 : 0;
        document.querySelector(".commentContainer").style.opacity =
          isLast && isCommentVisible ? 1 : 0;
      });

      useEffect(() => {
        setVisible(scale);
        if (video)
          dispatch(setVideo({ url: video, active: !!scale, visible: false }));
      }, [scale]);

      useEffect(() => {
        if (firstRender > 0) setFirstRender(firstRender - 1);
      }, [firstRender]);

      const btnDown = (id) => {
        setBtnActive(true);
      };

      const back = useCallback((g) => {
        g.clear();
        g.beginFill(0xffffff, 0.7);
        g.drawRect(0, 0, window.innerWidth, window.innerHeight);
        g.endFill();
      });

      //console.log(onVideoVisible);
      const btnUp = (id) => {
        setTimeout(() => {
          setBtnActive(false);
          //setVisible(0);
        }, 50);
        if (!isLast && video && !isVideoVisible) {
          dispatch(setVideo({ url: video, active: true, visible: true }));
          setVideoVisible(true);
          //console.log(onVideoVisible);
          onVideoVisible();
        } else if (comment && isLast && !isCommentVisible) {
          //dispatch(setComment(true))
          setCommentVisible(true);
          for (let i = 0; i < commentDOM.length; i++) {
            commentDOM[i].style.transform = "translateX(0vw)";
          }
          console.log(commentDOM[0].style);
          //onCommentVisible()
        } else {
          setTimeout(() => {
            document.querySelector(".commentContainer").style.transform =
              isLast && isCommentVisible
                ? "translate(-50% -50%) scale(1)"
                : "translate(-50% -50%) scale(0)";
            //action(id);
            setVisible(0);
            dispatch(setVideo({ url: video, active: false, visible: true }));
          }, 500);
          setTimeout(() => {
            close();
            setVisible(1);
            setVideoVisible(false);
            setCommentVisible(false);
            dispatch(setVideo({ url: video, active: false, visible: false }));
          }, 1000);
        }
      };

      return (
        <Spring
          {...(visible && {
            from: {
              x: 0,
              y: 0,
              scale: visible ? 0 : 1,
              alpha: visible ? 0 : 1,
            },
          })}
          to={{
            x: 0,
            y: 0,
            scale: visible ? 1 : 0,
            alpha: visible ? 1 : 0,
          }}
          config={spring}
        >
          {(props) => (
            <>
              <Graphics
                draw={(g) => back(g)}
                alpha={props.alpha}
                pivot={[window.innerWidth / 2, window.innerHeight / 2]}
                position={[window.innerWidth / 2, window.innerHeight / 2]}
                interactive={visible}
              />
              <Container
                alpha={props.alpha}
                scale={props.scale}
                pivot={[window.innerWidth / 2, window.innerHeight / 2]}
                position={[window.innerWidth / 2, window.innerHeight / 2]}
                mask={mask.current}
              >
                <Sprite
                  ref={mask}
                  image={gamesBg}
                  interactive
                  anchor={0.5}
                  scale={0.7 * relativeScale}
                  position={[window.innerWidth / 2, window.innerHeight / 2]}
                />
                <Sprite
                  image={gamesBg}
                  interactive
                  alpha={props.alpha}
                  scale={0.7 * relativeScale}
                  anchor={0.5}
                  position={[window.innerWidth / 2, window.innerHeight / 2]}
                />

                <Spring
                  to={{
                    containerX:
                      isVideoVisible || isCommentVisible
                        ? -window.innerWidth
                        : 0,
                    secondButton: isLast ? 1 : played ? 1 : 0,
                  }}
                  config={{ duration: 800, easing: easeQuadInOut }}
                >
                  {(props) => (
                    <Container x={props.containerX}>
                      <Sprite
                        image={image}
                        interactive
                        anchor={0.5}
                        scale={0.7 * relativeScale}
                        position={[
                          window.innerWidth / 2,
                          window.innerHeight / 2,
                        ]}
                      />

                      <Container
                        position={
                          buttonsPosition || [
                            window.innerWidth / 5,
                            window.innerHeight / 1.5,
                          ]
                        }
                        scale={relativeScale}
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
                            text={
                              isLast && !comment
                                ? "Regresar al mapa principal"
                                : "Continuar"
                            }
                            x={25}
                            y={9}
                            style={
                              new TextStyle({
                                fontFamily: "Poppins-Medium",
                                fontSize: 14,
                                fontWeight: "bold",
                                fill: "#fff",
                              })
                            }
                          />
                        </Container>
                      </Container>

                      <Container
                        position={[
                          window.innerWidth +
                            (window.innerWidth / 2 - (textWidth + 50) / 2),
                          window.innerHeight / 2 + window.innerWidth / 6.7,
                        ]}
                        interactive="true"
                        cursor="pointer"
                        pointerdown={btnDown}
                        pointerup={btnUp}
                      >
                        <Container
                          alpha={props.secondButton}
                          scale={props.secondButton}
                        >
                          <Graphics draw={(g) => labelBack2(g)} />
                          <Container
                            x={isBtnActive ? props.x : -2}
                            y={isBtnActive ? props.y : -4}
                          >
                            <Graphics draw={(g) => label2(g)} />
                            <Text
                              ref={text2}
                              text={isLast ? "Enviar" : "Continuar"}
                              x={25}
                              y={9}
                              style={
                                new TextStyle({
                                  fontFamily: "Poppins-Medium",
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  fill: "#fff",
                                })
                              }
                            />
                          </Container>
                        </Container>
                      </Container>
                    </Container>
                  )}
                </Spring>
              </Container>
            </>
          )}
        </Spring>
      );
    };
    return <Animated />;
  },
  (a, b) => a === b
);

export default TitleContainer;

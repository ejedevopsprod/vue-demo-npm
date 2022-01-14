import { Container, Graphics, Text } from "@inlet/react-pixi/animated";
import { TextStyle } from "pixi.js";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Spring } from "react-spring";
import * as PIXI from "pixi.js";
import { useDispatch } from "react-redux";
import { setAnchor } from "../redux/features/registry/registry";
import useWindowSize from "../../app/utils/useWindowSize";

const Dialog = memo(
  ({
    message,
    buttons,
    action,
    type,
    delay,
    direction,
    currentNode,
    addTime,
    onClose = () => {},
  }) => {
    const spring = { mass: 6, tension: 1000, friction: 100 };
    const pixiMessage = useRef({});
    const pixiBtn = useRef(buttons.map(() => ({})));
    const colors = [
      { base: 0xe8993d, back: 0xd67d17, line: 0xe8993d },
      { base: 0x2897ea, back: 0x092c74, line: 0x2897ea },
      { base: 0x2897ea, back: 0x092c74, line: 0xa5abc1 },
    ];

    const Animated = () => {
      const windowSize = useWindowSize();
      const scale = window.innerWidth / 1536;
      const containerMaxWidth = 400 * scale;
      const dispatch = useDispatch();
      const [isBtnActive, setBtnActive] = useState(buttons.map(() => false));
      const [firstRender, setFirstRender] = useState(3);
      const [visible, setVisible] = useState(0);
      let btnsWidth = 0;
      for (const i in pixiBtn.current) {
        if (pixiBtn.current[i].current)
          btnsWidth += pixiBtn.current[i].current.width;
      }
      const btnsAsRow =
        buttons.length < 4 &&
        btnsWidth + buttons.length * 50 + (buttons.length - 1) * 20 <
          containerMaxWidth;
      let btnsHeight = 0;
      if (btnsAsRow) {
        btnsHeight =
          pixiBtn.current
            .map((e) => (e.current ? e.current.height + 18 : 0))
            .sort((a, b) => a - b)[pixiBtn.current.length - 1] + 20;
      } else {
        for (const i in pixiBtn.current) {
          if (pixiBtn.current[i].current)
            btnsHeight += pixiBtn.current[i].current.height + 38 * scale;
        }
      }
      const containerWidth = useRef(0);
      const containerHeight = useRef(0);

      const container = useCallback((g) => {
        g.clear();
        g.lineStyle(1.5, colors[type].line, 1);
        g.beginFill(0xffffff, 1);
        g.drawRoundedRect(
          0,
          0,
          containerWidth.current,
          containerHeight.current,
          40 * scale
        );
        g.endFill();
      });

      const tail = useCallback((g) => {
        g.clear();
        g.lineStyle(1.5, colors[type].line, 1);
        g.beginFill(0xffffff, 1);
        g.bezierCurveTo(
          -20 * scale,
          0,
          -50 * scale,
          0,
          -60 * scale,
          -50 * scale
        );
        g.lineTo(0, 0);
        g.endFill();
      });

      const tailMask = useCallback((g) => {
        g.clear();
        g.beginFill(0xffffff, 1);
        g.drawCircle(-39 * scale, -21 * scale, 15 * scale);
        g.drawRect(-70 * scale, -53 * scale, 40 * scale, 40 * scale);
        g.endFill();
      });

      const label = useCallback((g, id) => {
        g.clear();
        g.beginFill(colors[type].base, 1);
        g.drawRoundedRect(
          0,
          0,
          50 * scale +
            (pixiBtn.current[id]
              ? pixiBtn.current[id].current
                ? pixiBtn.current[id].current.width
                : 0
              : 0),
          17 * scale +
            (pixiBtn.current[id]
              ? pixiBtn.current[id].current
                ? pixiBtn.current[id].current.height
                : 0
              : 0),
          40 * scale
        );
        g.endFill();
      });

      const labelBack = useCallback((g, id) => {
        g.clear();
        g.beginFill(colors[type].back, 1);
        g.drawRoundedRect(
          0,
          0,
          50 * scale +
            (pixiBtn.current[id]
              ? pixiBtn.current[id].current
                ? pixiBtn.current[id].current.width
                : 0
              : 0),
          17 * scale +
            (pixiBtn.current[id]
              ? pixiBtn.current[id].current
                ? pixiBtn.current[id].current.height
                : 0
              : 0),
          40 * scale
        );
        g.endFill();
      });

      useEffect(() => {
        pixiBtn.current = buttons.map(() => ({}));
        setTimeout(() => {
          setVisible(1);
        }, delay);
      }, []);

      useEffect(() => {
        containerWidth.current = (
          btnsAsRow
            ? [
                pixiMessage.current.width + 60 * scale,
                btnsWidth +
                  buttons.length * 50 +
                  (buttons.length - 1) * 20 +
                  60 * scale,
                0,
              ]
            : [
                ...pixiBtn.current.map((e) =>
                  e.current ? e.current.width + 110 * scale : 0
                ),
                pixiMessage.current.width + 60 * scale,
              ]
        ).sort((a, b) => b - a)[0];
        containerHeight.current =
          scale * 44 +
          pixiMessage.current.height +
          (buttons.length ? btnsHeight : 0);
      }, [pixiMessage, firstRender, windowSize]);

      useEffect(() => {
        dispatch(
          setAnchor([
            window.innerWidth / 2 - window.innerWidth / 30,
            window.innerHeight / 2,
          ])
        );
      }, [pixiMessage, firstRender]);

      useEffect(() => {
        setFirstRender(3);
      }, [windowSize]);

      useEffect(() => {
        if (firstRender > 0) setFirstRender(firstRender - 1);
      }, [firstRender]);

      const btnDown = (id) => {
        isBtnActive[id] = true;
        setBtnActive([...isBtnActive]);
      };

      const btnUp = (id) => {
        onClose();
        setTimeout(() => {
          isBtnActive[id] = false;
          setBtnActive([...isBtnActive]);
          setVisible(0);
        }, 50);
        setTimeout(() => {
          action(id);
          if (addTime) {
            dispatch(addTime(currentNode.descendants[id].node.time || 0));
          }
        }, 500);
      };

      const btnX = (id) => {
        let x = 0;
        for (let i = 1; i < id + 1; i++) {
          if (pixiBtn.current[i - 1] && pixiBtn.current[i - 1].current)
            x += pixiBtn.current[i - 1].current.width + 50;
        }
        return x;
      };

      const btnY = (id) => {
        let y = 0;
        for (let i = 1; i < id + 1; i++) {
          if (pixiBtn.current[i - 1] && pixiBtn.current[i - 1].current)
            y += pixiBtn.current[i - 1].current.height + 18 * scale;
        }
        return y;
      };

      //console.log(visible);

      /**
        x={
          type === 0
            ? Math.max(
                window.innerWidth / 3,
                window.innerWidth / 10 + containerWidth.current
              )
            : type === 1
            ? window.innerWidth -
              window.innerWidth / 10 -
              containerWidth.current
            : window.innerWidth / 2
        }
      */

      return (
        <Spring
          to={{
            visible,
            ...(isBtnActive.find((e) => e)
              ? { x: -1, y: -1 }
              : { x: -2 * scale, y: -4 * scale }),
          }}
          config={spring}
        >
          {(props) => (
            <Container
              scale={props.visible}
              pivot={
                pixiMessage.current.height
                  ? (type === 0 && !direction) || (type === 1 && direction)
                    ? [containerWidth.current, containerHeight.current]
                    : (type === 0 && direction) || (type === 1 && !direction)
                    ? [0, containerHeight.current]
                    : [containerWidth.current / 2, containerHeight.current]
                  : [0, 0]
              }
              x={
                (type === 0 && !direction) || (type === 1 && direction)
                  ? Math.max(
                      window.innerWidth / 2 - window.innerWidth / 10,
                      window.innerWidth / 10 + containerWidth.current
                    )
                  : (type === 0 && direction) || (type === 1 && !direction)
                  ? Math.min(
                      window.innerWidth / 2 + window.innerWidth / 10,
                      window.innerWidth -
                        window.innerWidth / 10 +
                        containerWidth.current
                    )
                  : window.innerWidth / 2
              }
              y={Math.max(
                window.innerHeight / 3,
                window.innerWidth / 10 + containerHeight.current
              )}
            >
              <Graphics draw={container} alpha={props.visible} />
              {type !== 2 && (
                <Container
                  pivot={
                    pixiMessage.current.height
                      ? (type === 0 && !direction) || (type === 1 && direction)
                        ? [
                            -containerWidth.current - 20 * scale,
                            -containerHeight.current,
                          ]
                        : [-20, -containerHeight.current]
                      : [0, 0]
                  }
                  scale={
                    (type === 0 && !direction) || (type === 1 && direction)
                      ? 1
                      : [-1, 1]
                  }
                >
                  <Graphics draw={tail} alpha={props.visible} />
                  <Graphics draw={tailMask} />
                </Container>
              )}

              <Container alpha={props.visible}>
                <Text
                  ref={pixiMessage}
                  text={message}
                  x={30 * scale}
                  y={20 * scale}
                  style={
                    new TextStyle({
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      wordWrap: true,
                      wordWrapWidth: containerMaxWidth,
                    })
                  }
                  scale={scale}
                />
                <Container x={32 * scale}>
                  {buttons.map((e, i) => (
                    <Container
                      x={btnsAsRow ? btnX(i) + 20 * scale * i : 0}
                      y={
                        44 * scale +
                        pixiMessage.current.height +
                        (btnsAsRow ? 0 : btnY(i) + 20 * scale * i)
                      }
                      interactive="true"
                      cursor="pointer"
                      pointerdown={() => btnDown(i)}
                      pointerup={() => btnUp(i)}
                    >
                      <Graphics draw={(g) => labelBack(g, i)} />
                      <Container
                        x={isBtnActive[i] ? props.x : -2 * scale}
                        y={isBtnActive[i] ? props.y : -4 * scale}
                      >
                        <Graphics draw={(g) => label(g, i)} />
                        <Text
                          ref={pixiBtn.current[i]}
                          text={e}
                          x={25 * scale}
                          y={9 * scale}
                          style={
                            new TextStyle({
                              fontFamily: "Poppins-Bold",
                              fontSize: 14,
                              fontWeight: "bold",
                              fill: "#fff",
                              wordWrap: true,
                              wordWrapWidth: containerMaxWidth - 40,
                              align: "center",
                            })
                          }
                          scale={scale}
                        />
                      </Container>
                    </Container>
                  ))}
                </Container>
              </Container>
            </Container>
          )}
        </Spring>
      );
    };

    return <Animated />;
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id
);

export default Dialog;

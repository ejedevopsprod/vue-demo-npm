import { Container, Graphics, Text } from "@inlet/react-pixi/animated";
import { Spring } from "@react-spring/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextStyle } from "pixi.js";
import useWindowSize from "../utils/useWindowSize";
import random from "../utils/random";

export default function Quotes({ quotes = [], visible, ageRange }) {
  const spring = { mass: 6, tension: 1000, friction: 100 };
  const Animated = () => {
    const windowSize = useWindowSize();
    const text = useRef(quotes.map(() => ({})));
    const containerMaxWidth = useRef(100);
    const scale = window.innerWidth / 1536;
    const [firstRender, setFirstRender] = useState(3);
    const containersSize = useRef([]);
    const [isVisible, setVisible] = useState(0);
    const clients = [
      "Daniel",
      "Juan",
      "José",
      "María",
      "Selene",
      "Felipe",
      "Ángel",
      "Rosario",
      "Silvia",
      "Berenice",
      "Jorge",
      "Arturo",
      "Omar",
      "Eduardo",
      "Isabel",
      "Nayeli",
      "Yadira",
      "Elizabeth",
      "René",
      "Alfredo",
    ];

    useEffect(() => {
      setVisible(visible && quotes.length ? 1 : 0);
    }, [visible]);

    useEffect(() => {
      setFirstRender(3);
    }, [windowSize]);

    useEffect(() => {
      if (firstRender > 0) setFirstRender(firstRender - 1);
    }, [firstRender]);

    useEffect(() => {
      containersSize.current = text.current.map((e, i) =>
        e.current
          ? {
              width: e.current.width + 30 * scale + 100,
              height: e.current.height + 30 * scale,
            }
          : null
      );
    }, [text, firstRender, windowSize]);

    const container = useCallback((g, i) => {
      g.clear();
      g.lineStyle(1.5, 0x127ee0, 1);
      g.beginFill(0xffffff, 1);
      g.drawRoundedRect(
        0,
        0,
        containersSize.current[i] ? containersSize.current[i].width : 0,
        containersSize.current[i] ? containersSize.current[i].height : 0,
        40 * scale
      );
      g.endFill();
    });

    return (
      <Spring
        {...(!visible
          ? { from: { alpha: isVisible ? 0 : 1, scale: isVisible ? 0 : 1 } }
          : null)}
        to={{ alpha: isVisible, scale: isVisible }}
        config={spring}
      >
        {(props) => (
          <Container alpha={!!firstRender ? 0 : 1}>
            <Container
              {...props}
              position={[
                window.innerWidth - 15 * scale,
                window.innerHeight -
                  window.innerHeight / 7 -
                  window.innerHeight / 30 -
                  (containersSize.current[quotes.length - 2]
                    ? containersSize.current
                        .map(
                          (e, j) =>
                            containersSize.current[j].height +
                            window.innerHeight / 50
                        )
                        .reduce((a, b) => a + b)
                    : 0),
              ]}
            >
              <Text
                anchor={1}
                text={"La voz de nuestros clientes"}
                style={
                  new TextStyle({
                    fontFamily: "Poppins-Medium",
                    fontSize: 21,
                    align: "right",
                    wordWrap: true,
                    wordWrapWidth: 300,
                    fill: "#D67D17",
                    fontWeight: "bold",
                  })
                }
                scale={scale}
              />
            </Container>
            {quotes.map((e, i) => (
              <Container
                key={i}
                {...props}
                position={[
                  window.innerWidth + 100,
                  window.innerHeight -
                    window.innerHeight / 7 -
                    window.innerHeight / 30 -
                    (containersSize.current[i - 1]
                      ? containersSize.current
                          .map((e, j) =>
                            j < i
                              ? containersSize.current[j].height +
                                window.innerHeight / 50
                              : 0
                          )
                          .reduce((a, b) => a + b)
                      : 0),
                ]}
                pivot={[
                  containersSize.current[i]
                    ? containersSize.current[i].width
                    : 0,
                  containersSize.current[i]
                    ? containersSize.current[i].height
                    : 0,
                ]}
              >
                <Graphics draw={(g) => container(g, i)} />
                <Text
                  ref={text.current[i]}
                  text={`${quotes[i]}\n\n${random(clients)}. ${Math.round(
                    Math.random() * (ageRange[1] - ageRange[0]) + ageRange[0]
                  )} años.`}
                  position={[15 * scale, 15 * scale]}
                  style={
                    new TextStyle({
                      fontFamily: "Poppins-Medium",
                      fontSize: 16,
                      align: "right",
                      wordWrap: true,
                      wordWrapWidth: 300,
                    })
                  }
                  scale={scale}
                />
              </Container>
            ))}
          </Container>
        )}
      </Spring>
    );
  };
  return <Animated />;
}

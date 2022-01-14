import React, { useRef, useEffect, useState } from "react";
import { Container, Sprite } from "@inlet/react-pixi/animated";
import LottieSprite from "../../baseComponents/LottieSprite";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import ProgressBar from "./components/ProgressBar";
import Message from "./components/Message";
import { Spring } from "react-spring";

import phoneLogo from "../../assets/games/messageGame/logo.png";
import phoneLottie from "../../assets/anim/cel_game_05.json";
import sendSprite from "../../assets/games/messageGame/btnenviar.png";
import callSprite from "../../assets/games/messageGame/marcabtn.png";

import gameOk from "../../assets/games/messageGame/juego5_ganar.png";

const CLICKS_LIMIT = 20;

const MessagesGame = ({ visible, close = () => null }) => {
  const spring = { mass: 8, tension: 10000, friction: 1000 };

  const [clicks, setClick] = useState(1),
    [success, setSuccess] = useState(false),
    [segments, setSegments] = useState([0, 2]),
    [platLottie, setPlayLottie] = useState(false),
    [messageUI, setMessageUI] = useState(true),
    [callUI, setCallUI] = useState(false);
  let intervalRef = useRef(null),
    timeoutRef = useRef(null);

  const onClick = () => {
    if (clicks === CLICKS_LIMIT) return null;
    clearInterval(intervalRef.current);
    let clickAdded = clicks === 0 ? 4 : 1;
    setClick(clicks + clickAdded);
    if (clicks + 1 === CLICKS_LIMIT) {
      setMessageUI(false);
      setSegments([0, 16]);
      setTimeout(() => {
        setPlayLottie(true);
        setCallUI(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 500);
      /* timeoutRef.current = setTimeout(() => {
        setClick(0);
        setSegments([14, 34]);
        setCallUI(false);
        setTimeout(() => {
          setPlayLottie(true);
          setMessageUI(true)
        }, 500);
      }, 2000) */
    }
  };

  const onComplete = () => {
    setSuccess(true);
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    let intervalTime = 500 - clicks * 20;
    intervalRef.current = setInterval(() => {
      if (clicks === 0) return clearInterval(intervalRef.current);
      setClick(clicks - 1);
    }, intervalTime);

    return () => clearInterval(intervalRef.current);
  }, [clicks]);

  if (!visible) return null;

  if (success)
    return (
      <GameDialog
        image={gameOk}
        button="CONTINUAR"
        close={close}
        scale={1}
        alpha={1}
      />
    );

  //return null
  return (
    <Container
      position={{
        x: window.innerWidth / 2 - 450,
        y: window.innerHeight / 2 - 150,
      }}
    >
      <Container
        position={{
          x: 100,
          y: -300,
        }}
        zIndex={10}
        visible={messageUI}
      >
        <ProgressBar
          backgroundVisible={false}
          color={0x127ee0}
          value={clicks}
          limit={CLICKS_LIMIT - 1}
        />
      </Container>
      <Container
        position={{
          x: messageUI ? -100 : -150,
          y: messageUI ? -500 : -450,
        }}
      >
        <LottieSprite
          play={platLottie}
          data={phoneLottie}
          position={{ x: 100, y: 100 }}
          width={1000}
          height={1000}
          playSegments={segments}
        />
        <Spring
          native
          to={{
            x: messageUI ? 0 : 620,
            y: messageUI ? 0 : 570,
            scale: messageUI ? 1 : 0,
          }}
          config={spring}
        >
          {(props) => (
            <Container {...props}>
              <Message visible={messageUI} onClick={onClick} />
            </Container>
          )}
        </Spring>
        <Spring to={{ scale: callUI ? 1 : 0 }}>
          {(props) => (
            <Container
              {...props}
              position={{
                x: 530,
                y: 450,
              }}
              visible={callUI}
            >
              <Sprite image={phoneLogo} width={150} height={250} />
              <Container
                interactive={true}
                cursor="pointer"
                pointerup={onComplete}
              >
                <Sprite
                  image={callSprite}
                  width={150}
                  height={50}
                  x={0}
                  y={280}
                />
              </Container>
            </Container>
          )}
        </Spring>
      </Container>
    </Container>
  );
};

export default MessagesGame;

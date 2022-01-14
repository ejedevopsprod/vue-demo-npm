import React, { useEffect, useState, useCallback } from "react";
import { Container, Text, Graphics } from "@inlet/react-pixi/animated";
import { TextStyle } from "pixi.js";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import CircleButton from "./Button";
import ProgressBar from "../../baseComponents/ProgressBar";
import { seconds2minutes } from "../../utils/timeFormat";
import { getRandomValues } from "./utils";
import { Spring } from "@react-spring/core";

import gameOk from "../../assets/games/phoneGame/game_02_ok.png";
import gameWrong from "../../assets/games/phoneGame/game_02_wrong.png";

import data from "../../assets/anim/celular.json";
import ReactLottie from "../../baseComponents/ReactLottie";
import { addTime } from "../../redux/features/registry/time";
import { useDispatch } from "react-redux";

const phoneValues = [
  ["555", "561", "525", "556", "575", "506", "449", "590"],
  ["8096", "0896", "9980", "8609", "9680", "6908", "8095", "0968"],
  ["555", "561", "525", "556", "575", "506", "449", "590"],
];
const phoneRight = ["555", "8096", "555"];
let time = 0;
let gameEnded = false;

const TIME_LIMIT = 25;

export default function PhoneGame({ visible, close }) {
  const dispatch = useDispatch();
  const spring = { mass: 10, tension: 1000, friction: 100 };

  const [step, setStep] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [segments, setSegments] = useState([0, 1]);
  const [numbers, setNumbers] = useState(getRandomValues(phoneValues[step]));
  const [playLottie, setPlayLottie] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [successGame, setSuccessGame] = useState(false);
  const [failGame, setFailGame] = useState(false);

  let timeout = null;

  const onClick = (value) => {
    const rightValue = phoneRight[step];

    if (rightValue === value) {
      setStep(step + 1);
      setNumbers([]);
      if (step + 1 !== 3) {
        setTimeout(() => {
          setNumbers(getRandomValues(phoneValues[step + 1]));
        }, 1000);
      }
      if (step + 1 === 3) {
        gameEnded = true;
        onSuccess();
        setTimeout(() => setSuccessGame(true), 3000);
      }
    } else {
      gameEnded = true;
      onFail();
      setTimeout(() => setFailGame(true), 3000);
      setAttempts(attempts + 1);
    }
  };

  const onSuccess = () => {
    setSegments([0, 40]);
    setPlayLottie(true);
  };
  const onFail = () => {
    dispatch(addTime(24));
    setSegments([41, 80]);
    setPlayLottie(true);
  };

  const updateTime = () => {
    if (time === TIME_LIMIT) {
      clearInterval(timeout);
      if (!gameEnded) {
        onFail();
        setTimeout(() => setFailGame(true), 3000);
      }
      time = 0;
    } else if (gameEnded) {
      clearInterval(timeout);
    } else {
      time = time + 1;
      setCurrentTime(time);
    }
  };

  const resetGame = () => {
    time = 0;
    gameEnded = false;
    setStep(0);
    setSegments([0, 1]);
    setNumbers(getRandomValues(phoneValues[0]));
    setPlayLottie(false);
    setCurrentTime(0);
    setSuccessGame(false);
    setFailGame(false);
    timeout = setInterval(updateTime, 1000);
  };

  useEffect(() => {
    time = 0;
    gameEnded = false;
    if (visible) timeout = setInterval(updateTime, 1000);
    return () => {
      clearInterval(timeout);
    };
  }, [visible]);

  let text = `${phoneRight[step]}`;

  let lottieAnimation = !(
    Boolean(step <= 2) &&
    !gameEnded &&
    time !== TIME_LIMIT
  )
    ? { x: 280, y: -150, scale: 1 }
    : { x: -10, y: -90, scale: 0.8 };

  const style = new TextStyle({
    fontFamily: "Poppins-Medium",
    align: "center",
    fontWeight: "bold",
    fill: "#E7993D",
    wordWrap: true,
    wordWrapWidth: 350,
  });

  const borderText = useCallback((graphics) => {
    graphics.clear();
    graphics.lineStyle(2, 0xe7993d, 1);
    graphics.drawRoundedRect(-60, -24, 120, 50, 50);
    graphics.endFill();
  }, []);

  if (successGame)
    return (
      <GameDialog
        image={gameOk}
        message={
          "Te haz puesto en contacto con Profuturo. Podrás seguir tu proceso"
        }
        button={"Continuar"}
        close={close}
        scale={1}
        alpha={1}
      />
    );

  if (failGame)
    return (
      <GameDialog
        image={gameWrong}
        message={
          "Te haz puesto en contacto con Profuturo. Podrás seguir tu proceso"
        }
        button={"Seguir buscando"}
        close={resetGame}
        scale={1}
        alpha={1}
      />
    );

  return (
    <Container
      position={{
        x: window.innerWidth / 2 - 450,
        y: window.innerHeight / 2 - 150,
      }}
    >
      <Container
        visible={Boolean(step <= 2) && !gameEnded && time !== TIME_LIMIT}
        position={{ x: 600, y: -80 }}
      >
        <Text
          style={style}
          text={text}
          anchor={0.5}
          x={0}
          y={180}
          position={{ x: 0, y: 0 }}
        />
        <Graphics draw={borderText} zIndex={1} />
      </Container>
      <Spring native from={{ x: 0, y: 0 }} to={lottieAnimation} config={spring}>
        {(props) => (
          <Container {...props}>
            <ReactLottie
              id={0}
              className={"phone"}
              play={playLottie}
              data={data}
              position={{
                x: window.innerWidth / 2 - 450 + lottieAnimation.x,
                y: window.innerHeight / 2 - 150 + lottieAnimation.y,
              }}
              width={300}
              height={600}
              playSegments={segments}
              scale={lottieAnimation.scale}
              transform={`scale(${visible ? 1 : 0})`}
            />
          </Container>
        )}
      </Spring>
      {Boolean(step <= 2) && !gameEnded && time !== TIME_LIMIT && (
        <Container position={{ x: 300, y: -110 }}>
          {numbers.map((number, index) => (
            <CircleButton
              attempts={attempts}
              index={index}
              value={number}
              onClick={onClick}
            />
          ))}
        </Container>
      )}
      <Container
        visible={Boolean(step <= 2) && !gameEnded && time !== TIME_LIMIT}
        position={{ x: 300, y: 20 }}
      >
        <Text
          text={seconds2minutes(TIME_LIMIT - currentTime)}
          anchor={0.5}
          position={{ x: 50, y: 380 }}
        />
        <ProgressBar value={currentTime} limit={TIME_LIMIT} x={100} y={110} />
      </Container>
    </Container>
  );
}

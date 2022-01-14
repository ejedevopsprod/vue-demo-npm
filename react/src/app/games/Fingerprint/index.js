import React, { useRef, useEffect, useState } from "react";
import { Container } from "@inlet/react-pixi/animated";
import Hand from "./components/Hand";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import ProgressBar from "../../baseComponents/ProgressBar";

import gameOk from "../../assets/games/fingerprint/juego4_ganar.png";
import gameWrong from "../../assets/games/fingerprint/juego4_perder.png";
import { addTime } from "../../redux/features/registry/time";
import { useDispatch } from "react-redux";

const handOne = [
    { x: 100, y: 100 },
    { x: 500, y: 120 },
    { x: 400, y: 0 },
    { x: -150, y: 10 },
    { x: 250, y: 40 },
  ],
  handTwo = [
    { x: 500, y: 120 },
    { x: 300, y: 50 },
    { x: -70, y: 10 },
    { x: 300, y: 70 },
    { x: -300, y: 40 },
  ],
  handThree = [
    { x: 300, y: 50 },
    { x: -70, y: 10 },
    { x: 100, y: 110 },
    { x: 500, y: 120 },
    { x: 500, y: 10 },
  ],
  handFour = [
    { x: -70, y: 10 },
    { x: 100, y: 100 },
    { x: 500, y: 120 },
    { x: 300, y: 50 },
    { x: 180, y: 80 },
  ];

const TIME_LIMIT = 15;
let gameEnded = false;

const Fingerprint = ({ visible, close }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0),
    [phase, setPhase] = useState(0),
    [currentTime, setCurrentTime] = useState(0),
    [successGame, setSuccessGame] = useState(false),
    [failGame, setFailGame] = useState(false);

  let interval = useRef(null),
    gameInterval = useRef(null);

  const updatePhase = () => setPhase(phase < 4 ? phase + 1 : 0);
  const updateTime = () => {
    if (currentTime === TIME_LIMIT) {
      clearInterval(interval.current);
      clearInterval(gameInterval.current);
      if (!gameEnded) setFailGame(true);
    } else if (gameEnded) {
      clearInterval(interval.current);
      clearInterval(gameInterval.current);
    } else {
      setCurrentTime(currentTime + 1);
    }
  };

  const onClick = () => {
    setStep(step + 1);
    if (step >= 3) {
      setSuccessGame(true);
      gameEnded = true;
    }
  };

  const resetGame = () => {
    setCurrentTime(0);
    setStep(0);
    setPhase(0);
    setSuccessGame(false);
    setFailGame(false);
    gameEnded = false;
  };

  useEffect(() => {
    if (!visible) return null;
    interval.current = setInterval(updatePhase, 1300);
    return () => clearInterval(interval.current);
  }, [phase, visible]);

  useEffect(() => {
    if (!visible) return null;
    gameInterval.current = setInterval(updateTime, 1000);
    return () => clearInterval(gameInterval.current);
  }, [currentTime, visible]);

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

  if (failGame) {
    dispatch(addTime(24));
    return (
      <GameDialog
        image={gameWrong}
        message={
          "Te haz puesto en contacto con Profuturo. Podrás seguir tu proceso"
        }
        button={"Seguir intentando"}
        close={resetGame}
        scale={1}
        alpha={1}
      />
    );
  }

  return (
    <React.Fragment>
      <Container
        position={{
          x: window.innerWidth / 2 - 450,
          y: window.innerHeight / 2 - 150,
        }}
        //mask={mask.current}
      >
        <Container position={{ x: 150, y: -450 }}>
          <ProgressBar value={currentTime} limit={TIME_LIMIT} x={100} y={110} />
        </Container>
        <Hand
          onClick={onClick}
          isVisible={step >= 0}
          initialPos={handOne[0]}
          currentPos={handOne[phase]}
        />
        <Hand
          onClick={onClick}
          isVisible={step >= 1}
          initialPos={handTwo[0]}
          currentPos={handTwo[phase]}
        />
        <Hand
          onClick={onClick}
          isVisible={step >= 2}
          initialPos={handThree[0]}
          currentPos={handThree[phase]}
        />
        <Hand
          onClick={onClick}
          handSide="right"
          isVisible={step >= 2}
          initialPos={handFour[0]}
          currentPos={handFour[phase]}
        />
      </Container>
    </React.Fragment>
  );
};

export default Fingerprint;

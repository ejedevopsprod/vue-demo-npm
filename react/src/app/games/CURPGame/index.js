import React, { useEffect, useState, useRef } from "react";
import { Container, Sprite, Text } from "@inlet/react-pixi/animated";
import ProgressBar from "../../baseComponents/ProgressBar";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";

import curp from "../../assets/games/grabGame/01_curp.png";
import curpFake1 from "../../assets/games/CURPGame/juego1curp_02.png";
import curpFake2 from "../../assets/games/CURPGame/juego1curp_03.png";
import gameOk from "../../assets/games/CURPGame/ganar.png";
import gameWrong from "../../assets/games/CURPGame/perder.png";
import { addTime } from "../../redux/features/withdrawals/time";
import { useDispatch } from "react-redux";
//import { useSelector } from "react-redux";

let curps = new Array(28).fill(0);
const TIME_LIMIT = 4;
let gameEnded = false;

export default function CURPGame({ visible, close }) {
  const dispatch = useDispatch();
  //const { timeCount } = useSelector((state) => state.withdrawalsTime);
  const [curpValues, setCurpValues] = useState([]),
    [currentTime, setCurrentTime] = useState(0),
    [successGame, setSuccessGame] = useState(false),
    [failGame, setFailGame] = useState(false);

  let interval = useRef(null),
    gameInterval = useRef(null);

  const onClick = (value) => {
    if (value.value) {
      dispatch(addTime(24));
      setSuccessGame(true);
      gameEnded = true;
    }
  };

  const updateTime = () => {
    if (currentTime === TIME_LIMIT) {
      clearInterval(interval.current);
      clearInterval(gameInterval.current);
      if (!gameEnded) {
        dispatch(addTime(24 * 70));
        setFailGame(true);
      }
    } else if (gameEnded) {
      clearInterval(interval.current);
      clearInterval(gameInterval.current);
    } else {
      setCurrentTime(currentTime + 1);
    }
  };

  const resetGame = () => {
    setCurrentTime(0);
    setSuccessGame(false);
    setFailGame(false);
    gameEnded = false;
  };

  useEffect(() => {
    if (visible) {
      curps = curps
        .map((_, i) => ({
          value: i === 0,
          rand: Math.random(),
          image: Math.random(),
        }))
        .sort((a, b) => a.rand - b.rand);
      setCurpValues(curps);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return null;
    gameInterval.current = setInterval(updateTime, 1000);
    return () => clearInterval(gameInterval.current);
  }, [currentTime, visible]);

  if (successGame)
    return (
      <GameDialog
        image={gameOk}
        button={"Continuar"}
        close={() => close(1)}
        scale={1}
        alpha={1}
      />
    );

  if (failGame)
    return (
      <GameDialog
        image={gameWrong}
        button={"Continuar"}
        close={() => close(0)}
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
      <Container position={{ x: 220, y: -350 }}>
        <ProgressBar value={currentTime} limit={TIME_LIMIT} visible={visible} />
      </Container>
      <Container position={{ x: 100, y: 0 }}>
        {curpValues.map((value, i) => {
          let image = curp;
          if (!value.value) image = Math.random() > 0.5 ? curpFake1 : curpFake2;
          return (
            <Container
              interactive
              pointerdown={() => onClick(value)}
              position={[(i % 7) * 100, Math.floor(i / 7) * 100]}
            >
              <Sprite image={image} interactive height={80} width={60} />
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}

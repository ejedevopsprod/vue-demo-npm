import { Container, Sprite } from "@inlet/react-pixi/animated";
import React, { useEffect, useRef, useState } from "react";
import curp from "../../assets/games/grabGame/01_curp.png";
import nss from "../../assets/games/grabGame/02_nss.png";
import acta from "../../assets/games/grabGame/03_acta.png";
import ine from "../../assets/games/grabGame/04_ine.png";
import prof from "../../assets/games/grabGame/05_prof.png";
import docs from "../../assets/games/grabGame/06_docs.png";
import casa from "../../assets/games/grabGame/07_casa.png";
import pasaporte from "../../assets/games/grabGame/08_pasapote.png";
import hand from "../../assets/games/grabGame/hand_large.png";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import gameOk from "../../assets/games/grabGame/juego3_ganar.png";
import gameWrong from "../../assets/games/grabGame/juego3_perder.png";
import ProgressBar from "../../baseComponents/ProgressBar";
import { addTime } from "../../redux/features/registry/time";
import { useDispatch } from "react-redux";

export default function Index({ visible, close, reset }) {
  const dispatch = useDispatch();
  const [mousePosition, setMousePosition] = useState();
  const [message, setMessage] = useState({ status: false, visible: false });
  const [currentTime, setCurrentTime] = useState(0);

  const TIME_LIMIT = 15;
  const cardPositions = useRef([]);
  const grabbedDocs = useRef(0);
  let x = -450;
  let y = -150;

  useEffect(() => {
    for (let i = 0; i < 21; i++) {
      cardPositions.current.push({
        id: i,
        position: [x, y],
        scale: 0.7,
        alpha: 1,
      });
      x += 150;
      y += 150;
      if (x > 450) x = -450;
      if (y > 150) y = -150;
    }
    shuffleCards();
  }, []);

  useEffect(() => {
    if (visible) {
      updateTime();
    } else {
      setCurrentTime(0);
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

  const shuffleCards = () => {
    let currentIndex = cardPositions.current.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [
        cardPositions.current[currentIndex],
        cardPositions.current[randomIndex],
      ] = [
        cardPositions.current[randomIndex],
        cardPositions.current[currentIndex],
      ];
    }
  };

  const handleMouseMove = (e) => {
    setMousePosition([
      e.data.global.x - window.innerWidth / 2,
      e.data.global.y - window.innerHeight / 2,
    ]);
  };

  const handleClick = (id, valid) => {
    cardPositions.current[id].alpha = 0;
    cardPositions.current[id].scale = 0;
    setMousePosition([...mousePosition]);

    if (valid) {
      grabbedDocs.current++;
      if (grabbedDocs.current === 4) {
        setMessage({ status: true, visible: true });
      }
    } else {
      dispatch(addTime(24));
      setMessage({ status: false, visible: true });
    }
  };

  const closeDialog = () => {
    if (message.status) {
      close();
    } else {
      grabbedDocs.current = 0;
      setMessage({ status: false, visible: false });
      cardPositions.current.map((e) => {
        e.scale = 0.7;
        e.alpha = 1;
        return e;
      });
      shuffleCards();
      reset();
    }
  };

  return (
    <Container>
      <Container
        scale={message.visible ? 0 : 1}
        alpha={message.visible ? 0 : 1}
      >
        <Container
          pivot={[-window.innerWidth / 2, -window.innerHeight / 1.8]}
          mousemove={handleMouseMove}
          interactive
        >
          <Sprite
            image={curp}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[0].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(0, true)}
            scale={
              cardPositions.current.length ? cardPositions.current[0].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[0].alpha : 0
            }
          />
          <Sprite
            image={nss}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[1].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(1, true)}
            scale={
              cardPositions.current.length ? cardPositions.current[1].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[1].alpha : 0
            }
          />
          <Sprite
            image={acta}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[2].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(2)}
            scale={
              cardPositions.current.length ? cardPositions.current[2].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[2].alpha : 0
            }
          />
          <Sprite
            image={ine}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[3].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(3, true)}
            scale={
              cardPositions.current.length ? cardPositions.current[3].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[3].alpha : 0
            }
          />
          <Sprite
            image={prof}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[4].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(4)}
            scale={
              cardPositions.current.length ? cardPositions.current[4].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[4].alpha : 0
            }
          />
          <Sprite
            image={docs}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[5].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(5)}
            scale={
              cardPositions.current.length ? cardPositions.current[5].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[5].alpha : 0
            }
          />
          <Sprite
            image={casa}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[6].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(6, true)}
            scale={
              cardPositions.current.length ? cardPositions.current[6].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[6].alpha : 0
            }
          />
          <Sprite
            image={pasaporte}
            anchor={[0.5]}
            position={
              cardPositions.current.length
                ? cardPositions.current[7].position
                : [0, 0]
            }
            interactive
            click={() => handleClick(7)}
            scale={
              cardPositions.current.length ? cardPositions.current[7].scale : 0
            }
            alpha={
              cardPositions.current.length ? cardPositions.current[7].alpha : 0
            }
          />

          <Sprite
            image={hand}
            scale={0.8}
            anchor={[0.5, window.innerHeight / 10 / window.innerHeight]}
            position={mousePosition}
          />
          <ProgressBar
            value={currentTime}
            limit={TIME_LIMIT}
            x={-250}
            y={-530}
          />
        </Container>
      </Container>
      <GameDialog
        image={message.status ? gameOk : gameWrong}
        button={message.status ? "Continuar" : "Seguir buscando"}
        close={closeDialog}
        scale={message.visible ? 1 : 0}
        alpha={message.visible ? 1 : 0}
      />
    </Container>
  );
}

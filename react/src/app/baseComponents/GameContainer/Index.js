import { Container, Graphics, Sprite } from "@inlet/react-pixi/animated";
import React, { useRef, useCallback, useEffect, useState, memo } from "react";
import Back from "../Back";
import GameDialog from "./components/GameDialog";
import ShellGame from "../../games/ShellGame";
import PhoneGame from "../../games/PhoneGame";
import FingerprintGame from "../../games/Fingerprint";
import MessagesGame from "../../games/MessagesGame";
import { Spring } from "react-spring";
import img1 from "../../assets/games/shellGame/game_01_intro_v2.png";
import img2 from "../../assets/games/phoneGame/game_02_intro.png";
import img3 from "../../assets/games/grabGame/inst_juego3.png";
import img4 from "../../assets/games/fingerprint/inst_juego4.png";
import img5 from "../../assets/games/messageGame/inst_juego5.png";
import img6 from "../../assets/games/CURPGame/instruccionesjuegocurp.png";
import img7 from "../../assets/games/formGame/instruccionesjuego4.png";
import img8 from "../../assets/games/pipesGame/juego5_instrucciones.png";
import gamesBg from "../../assets/games/games_bg.png";
import GrabGame from "../../games/GrabGame";
import FormGame from "../../games/FormGame";
import CURPGame from "../../games/CURPGame";
import PipesGame from "../../games/PipesGame";
//import { useDispatch } from "react-redux";
//import { addTime } from "../../redux/features/registry/registry";

const Index = memo(
  ({ id, lastId, close }) => {
    const spring = { mass: 6, tension: 1000, friction: 100 };

    useEffect(() => {
      return () => {
        //console.log("UNMONT");
        //setClose(false);
      };
    }, []);
    const Animated = () => {
      //const dispatch = useDispatch();
      const scale = window.innerWidth / 1536;
      const [isGameVisible, setGameVisible] = useState(false);
      const [isClose, setClose] = useState(false);
      const mask = useRef();
      const tries = useRef(0);

      const background = useCallback((g) => {
        g.clear();
        g.beginFill(0xffffff, 0.7);
        g.drawRect(0, 0, window.innerWidth, window.innerHeight);
        g.endFill();
      });

      useEffect(() => {
        return () => {
          //console.log("UNMONT");
          //setClose(false);
        };
      }, []);

      const handleClose = (stay, gameId) => {
        setClose(true);
        document.querySelector(".gameHTMLContainer").style.opacity = 0;
        setTimeout(() => {
          close(stay, gameId);
          document.querySelector(".gameHTMLContainer").style.opacity = 1;
        }, 500);
      };

      const handleAddTime = (time) => {
        //dispatch(addTime(time));
        //showGame(true);
      };

      const games = [
        {
          game: (
            <ShellGame
              visible={isGameVisible}
              close={() => handleClose(false)}
              reset={() => showGame(false)}
              addTime={(time) => handleAddTime(time)}
            />
          ),
          image: img1,
          dialogButton: "Buscar",
        },
        {
          game: (
            <PhoneGame
              visible={isGameVisible}
              close={() => handleClose(false)}
              reset={() => showGame(false)}
            />
          ),
          image: img2,
          dialogButton: "Marcar",
          buttonPosition: [
            window.innerWidth / 2 - 450,
            window.innerHeight / 2 + 225,
          ],
        },
        {
          game: (
            <GrabGame
              visible={isGameVisible}
              close={() => handleClose(false)}
              reset={() => showGame(false)}
            />
          ),
          image: img3,
        },
        {
          game: (
            <FingerprintGame
              visible={isGameVisible}
              close={() => handleClose(false)}
              reset={() => showGame(false)}
            />
          ),
          image: img4,
        },
        {
          game: (
            <MessagesGame
              visible={isGameVisible}
              close={() => handleClose(false)}
              reset={() => showGame(false)}
            />
          ),
          image: img5,
          buttonPosition: [
            window.innerWidth / 2 - 450,
            window.innerHeight / 2 + 225,
          ],
        },
        {
          game: (
            <CURPGame
              visible={isGameVisible}
              close={(gameId) => handleClose(false, gameId)}
              reset={() => showGame(false)}
            />
          ),
          image: img6,
        },
        {
          game: (
            <FormGame
              visible={isGameVisible}
              close={(gameId) => handleClose(false, gameId)}
              reset={() => showGame(false)}
            />
          ),
          image: img7,
        },
        {
          game: (
            <PipesGame
              visible={isGameVisible}
              close={(gameId) => handleClose(false, gameId)}
              reset={() => showGame(false)}
            />
          ),
          image: img8,
        },
      ];
      const showGame = (show) => {
        setGameVisible(show);
      };
      return (
        <Spring
          from={{
            alpha: games[id] ? (isClose ? 1 : 0) : games[lastId] ? 1 : 0,
            scale: games[id]
              ? isClose
                ? 1 * scale
                : 0
              : games[lastId]
              ? 1 * scale
              : 0,
            messageVisible: isGameVisible ? 1 : 0,
            gameVisible: isGameVisible ? 0 : 1,
          }}
          to={{
            alpha: games[id] ? (isClose ? 0 : 1) : 0,
            scale: games[id] ? (isClose ? 0 : 1 * scale) : 0,
            messageVisible: isGameVisible ? 0 : 1,
            gameVisible: isGameVisible ? 1 : 0,
          }}
          config={spring}
        >
          {(props) => (
            <>
              <Graphics
                draw={background}
                interactive
                alpha={props.alpha}
                scale={games[id] ? 1 : 0}
              />
              <Container
                interactive
                scale={props.scale}
                alpha={props.alpha}
                pivot={[window.innerWidth / 2, window.innerHeight / 2]}
                position={[window.innerWidth / 2, window.innerHeight / 2]}
                mask={mask.current}
              >
                <Container>
                  <Sprite
                    image={gamesBg}
                    interactive
                    alpha={props.alpha}
                    scale={games[id] ? 0.7 : 0}
                    anchor={0.5}
                    position={[window.innerWidth / 2, window.innerHeight / 2]}
                  />
                  <Sprite
                    ref={mask}
                    image={gamesBg}
                    interactive
                    alpha={props.alpha}
                    scale={games[id] ? 0.7 : 0}
                    anchor={0.5}
                    position={[window.innerWidth / 2, window.innerHeight / 2]}
                  />
                  {!isGameVisible && (
                    <Container
                      alpha={props.messageVisible}
                      scale={props.messageVisible}
                      pivot={[window.innerWidth / 2, window.innerHeight / 2]}
                      position={[window.innerWidth / 2, window.innerHeight / 2]}
                    >
                      <GameDialog
                        image={games[id] && games[id].image}
                        close={() => {
                          tries.current++;
                          showGame(true);
                        }}
                        showSkip={tries.current > 2}
                        skip={() => handleClose(false)}
                        button={games[id] && games[id].dialogButton}
                        buttonPosition={games[id] && games[id].buttonPosition}
                      />
                    </Container>
                  )}
                </Container>
                <Container
                  interactive={isGameVisible ? 1 : 0}
                  alpha={props.gameVisible}
                  scale={props.gameVisible}
                  pivot={[window.innerWidth / 2, window.innerHeight / 2]}
                  position={[window.innerWidth / 2, window.innerHeight / 2]}
                >
                  {games[id] && games[id].game}
                </Container>
              </Container>
              {games[id] && <Back click={() => handleClose(true)} />}
            </>
          )}
        </Spring>
      );
    };

    return <Animated />;
  },
  (a, b) => a === b
);

export default Index;

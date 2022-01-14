import { Container, Sprite } from "@inlet/react-pixi/animated";
import React, { memo, useEffect, useRef, useState } from "react";
import lose from "../../assets/anim/scroll_up_wrong.json";
import win from "../../assets/anim/scroll_up_correct.json";
import GameDialog from "../../baseComponents/GameContainer/components/GameDialog";
import LottieSprite from "../../baseComponents/LottieSprite";
import { Spring } from "react-spring";
import gameOk from "../../assets/games/shellGame/game_01_ok.png";
import gameWrong from "../../assets/games/shellGame/game_01_wrong.png";
import ReactLottie from "../../baseComponents/ReactLottie";
import { addTime } from "../../redux/features/registry/time";
import { useDispatch } from "react-redux";

const Index = memo(
  ({ visible, close, reset }) => {
    const dispatch = useDispatch();
    const spring = { mass: 6, tension: 1000, friction: 100 };
    const [play, setPlay] = useState();
    const [isVisible, setVisible] = useState();
    const PCs = useRef([
      { active: false, hasPea: true, id: 0 },
      { active: false, hasPea: false, id: 1 },
      { active: false, hasPea: false, id: 2 },
      { active: false, hasPea: false, id: 3 },
    ]);
    const PCpositions = useRef(
      PCs.current.map((e, i) => ({
        x: i < 2 ? 300 * i + 150 : 300 * (i - 2) + 150,
        y: i < 2 ? -150 : 150,
      }))
    );
    const firstRender = useRef(true);
    const completeCount = useRef(0);
    const [cursor, setCursor] = useState();
    const [reveal, setReveal] = useState(-1);
    const [message, setMessage] = useState({ msg: "", visible: false });
    const [stopPCs, setStop] = useState();

    useEffect(() => {
      firstRender.current = false;
    }, []);

    useEffect(() => {
      setVisible(visible);
      setTimeout(() => {
        setPlay(visible);
      }, 1000);
    }, [visible]);

    const shufflePCs = () => {
      let currentIndex = PCs.current.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [PCs.current[currentIndex], PCs.current[randomIndex]] = [
          PCs.current[randomIndex],
          PCs.current[currentIndex],
        ];
      }
    };

    if (firstRender.current) {
      shufflePCs();
    }

    const animComplete = () => {
      completeCount.current++;
      if (completeCount.current === PCs.current.length) {
        setCursor("pointer");
      }
    };

    const revealPC = (id) => {
      setPlay(false);
      setTimeout(() => {
        if (PCs.current.length === 8) {
          setMessage({
            msg: PCs.current[id].hasPea ? "win" : "lose",
            visible: true,
            status: PCs.current[id].hasPea,
          });
        } else {
          if (PCs.current[id].hasPea) {
            //console.log("first");
            setReveal(-1);
            setVisible(false);
            //setReset(true);
            //setReset(false);
            setTimeout(() => {
              for (let i = 0; i < 2; i++) {
                PCs.current.push({
                  active: false,
                  hasPea: false,
                  id: PCs.current.length,
                });
              }
              shufflePCs();
              PCpositions.current = PCs.current.map((e, i) => ({
                x:
                  i < PCs.current.length / 2
                    ? 300 * i - 150 * ((PCs.current.length - 6) / 2)
                    : 300 * (i - PCs.current.length / 2) -
                      150 * ((PCs.current.length - 6) / 2),
                y: i < PCs.current.length / 2 ? -150 : 150,
              }));
              setStop(true);
              setReveal(-1);
              setVisible(true);
              //setVisible(false);
              //console.log("second");
              setTimeout(() => {
                //console.log("third");
                setStop(false);
                setPlay(true);
              }, 1000);
            }, 1000);
          } else {
            dispatch(addTime(24));
            //addTime(24);
            setVisible(false);
            setTimeout(() => {
              setMessage({
                visible: true,
                status: PCs.current[id].hasPea,
              });
              PCs.current = [
                { active: false, hasPea: true, id: 0 },
                { active: false, hasPea: false, id: 1 },
                { active: false, hasPea: false, id: 2 },
                { active: false, hasPea: false, id: 3 },
              ];
              PCpositions.current = PCs.current.map((e, i) => ({
                x: i < 2 ? 300 * i + 150 : 300 * (i - 2) + 150,
                y: i < 2 ? -150 : 150,
              }));
              setStop(true);
              setReveal(-1);
              setVisible(true);
              //setVisible(false);
              setTimeout(() => {
                setStop(false);
                setPlay(true);
              }, 1000);
            }, 1000);
          }
        }
      }, 1000);
      setReveal(id);
    };

    const closeDialog = () => {
      setStop(true);
      if (message.status) {
        close();
      } else {
        PCs.current = [
          { active: false, hasPea: true, id: 0 },
          { active: false, hasPea: false, id: 1 },
          { active: false, hasPea: false, id: 2 },
          { active: false, hasPea: false, id: 3 },
        ];
        PCpositions.current = PCs.current.map((e, i) => ({
          x: i < 2 ? 300 * i + 150 : 300 * (i - 2) + 150,
          y: i < 2 ? -150 : 150,
        }));
        setReveal(-1);
        setPlay(false);
        setPlay(true);
        message.visible = false;
        setMessage({ ...message });

        reset();
      }
      setStop(false);
      /*
    message.visible = false;
    setMessage({ ...message });
    if (message.status) {
    } else {
      shufflePCs();
      if (PCs.current.length === 4) {
        PCs.current = PCs.current.map((e, i) => {
          e.position = {
            x: i < 2 ? 300 * i + 150 : 300 * (i - 2) + 150,
            y: i < 2 ? -150 : 150,
          };
          return e;
        });
      }
      setReveal(-1);
      setVisible(false);
      setVisible(true);
    }
    */
    };
    //if (visible && isVisible && !message.visible)
    //  console.log("reveal: ", reveal, "visible: ", isVisible);

    return (
      <Container position={[0, 0]}>
        <Container
          position={{
            x:
              window.innerWidth / 2 -
              450 * (PCs.current.length === 8 ? 0.9 : 1),
            y:
              window.innerHeight / 2 -
              150 * (PCs.current.length === 8 ? 0.9 : 1),
          }}
          scale={message.visible ? 0 : PCs.current.length === 8 ? 0.9 : 1}
          alpha={message.visible ? 0 : 1}
        >
          {PCs.current.map((e, i) => (
            <ReactLottie
              key={e.id}
              id={e.id}
              id2={2}
              data={PCs.current[i].hasPea ? win : lose}
              position={PCpositions.current[i]}
              transform={`translate(calc(50vw - 450px), calc(50vh - 150px))`}
              width={300}
              height={300}
              playSegments={reveal === i ? [35, 50] : [0, 34]}
              play={isVisible && (play || reveal === i)}
              cursor={cursor}
              interactive={!!cursor}
              onComplete={animComplete}
              click={() => revealPC(i)}
              stop={stopPCs}
              alpha={visible && isVisible && !message.visible ? 1 : 0}
              scale={visible && isVisible && !message.visible ? 1 : 0}
              className={"PCs"}
              containerScale={PCs.current.length === 8 ? 0.9 : 1}
              speed={0.8}
            />
          ))}
        </Container>
        {message.visible && (
          <GameDialog
            image={message.status ? gameOk : gameWrong}
            button={message.status ? "Continuar" : "Seguir buscando"}
            close={closeDialog}
            scale={message.visible ? 1 : 0}
            alpha={message.visible ? 1 : 0}
          />
        )}
      </Container>
    );
  },
  (a, b) => {
    //console.log(a, b);
    return a === b;
  }
);

export default Index;

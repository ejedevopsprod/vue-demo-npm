import { Container, Text } from "@inlet/react-pixi/animated";
import React, { useEffect, useRef, useState } from "react";
import { TextStyle } from "pixi.js";
import clock from "../../../assets/anim/clock.json";
import LottieSprite from "../../../baseComponents/LottieSprite";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../utils/useWindowSize";
import { setScore, unlockWorld } from "../../../services/worlds";
import { setWorldScore, setWorldStatus } from "../../../redux/features/user";

export default function TimeCount({ setFinalScore }) {
  const { timeCount } = useSelector((state) => state.registryTime);
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const scale = window.innerWidth / 1536;
  const [position, setPositon] = useState([0, 0]);
  const [play, setPlay] = useState(false);
  const text = useRef();
  const windowSize = useWindowSize();

  const days = Math.floor(timeCount / 24);
  const hours = Math.floor(timeCount % 24);

  useEffect(() => {
    setPositon([
      -text.current.width - window.innerWidth / 13,
      -window.innerWidth / 30,
    ]);
  }, [windowSize]);

  useEffect(() => {
    setPlay(true);
    setTimeout(() => {
      setPlay(false);
    }, 2000);
  }, [timeCount]);

  useEffect(() => {
    setScore(userName, 0, 200, timeCount).then((res) => {
      dispatch(
        setWorldScore({
          index: 0,
          score: res.data[0].score,
          time: res.data[0].time,
        })
      );
      unlockWorld(userName, 1).then((res) => {
        console.log(!!res.data[0].active.data[0]);
        dispatch(
          setWorldStatus({ index: 1, active: !!res.data[0].active.data[0] })
        );
      });
    });
  }, [setFinalScore]);

  return (
    <>
      <Container position={[window.innerWidth - 20, window.innerHeight - 20]}>
        <LottieSprite
          key={windowSize.width}
          play={play}
          data={clock}
          width={window.innerWidth / 15}
          height={window.innerWidth / 15}
          anchor={[1, 1]}
          wait={0}
        />
        {!!days && (
          <Text
            anchor={[1, 0.5]}
            position={position}
            text={`${days}\nDías`}
            style={
              new TextStyle({
                fontFamily: "Poppins-Bold",
                fontSize: 20,
                fontWeight: "bold",
                fill: "#092C74",
                align: "center",
              })
            }
            scale={scale}
          />
        )}
        <Text
          ref={text}
          anchor={[1, 0.5]}
          position={[-window.innerWidth / 15, -window.innerWidth / 30]}
          text={`${hours}\nHoras`}
          style={
            new TextStyle({
              fontFamily: "Poppins-Bold",
              fontSize: 20,
              fontWeight: "bold",
              fill: "#092C74",
              align: "center",
            })
          }
          scale={scale}
        />
      </Container>
    </>
  );
}

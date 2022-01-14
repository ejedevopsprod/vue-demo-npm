import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import map from "../../assets/withdrawals/map.js";
import Back from "../../baseComponents/Back";
import Dialog from "../../baseComponents/Dialog";
import {
  setCurrentNode,
  resetNode,
} from "../../redux/features/withdrawals/withdrawals";
import { Spring } from "react-spring";
import { Container, Sprite, TilingSprite } from "@inlet/react-pixi/animated";
import LottieSprite from "../../baseComponents/LottieSprite";
import NodeAnimation from "../../baseComponents/NodeAnimation";
import data from "../../assets/anim/cat.json";
import data2 from "../../assets/anim/404.json";
import data3 from "../../assets/anim/smile.json";
import { easeCubicInOut } from "d3-ease";
import { setTransition } from "../../redux/features/transition";
import GameContainer from "../../baseComponents/GameContainer/Index";
import data4 from "../../assets/anim/scroll_up_correct.json";
import { setSection } from "../../redux/features/general.js";
import Avatar from "../Withdrawals/components/Avatar";
import TimeCount from "./components/TimeCount.js";
import laptop from "../../assets/anim/laptop.json";
import trees from "../../assets/map/trees/tree1.png";
import TitleContainer from "../../baseComponents/TitleContainer.js";
import image from "../../assets/withdrawals/instrucciones_juego2.png";
import image2 from "../../assets/withdrawals/instrucciones_juego2.png";
import useWindowSize from "../../utils/useWindowSize";
import ReactLottie from "../../baseComponents/ReactLottie.js";
import Quotes from "../../baseComponents/Quotes.js";
import { addTime } from "../../redux/features/withdrawals/time";
import rasterizeSVG from "../../utils/rasterizeSVG.js";
import { interruptAudio } from "../../redux/features/audio.js";

export default function Index() {
  const spring = { mass: 1, tension: 100, friction: 50 };

  const Animated = () => {
    useWindowSize();
    const scale = window.innerWidth / 1536;
    const [showTitle, setShowTitle] = useState(0);
    const [titleImage, setTitleImage] = useState(image);
    const [showAvatar, setShowAvatar] = useState(false);
    const [avatarStart, setAvatarStart] = useState(true);
    const [showQuotes, setShowQuotes] = useState(1);
    const dispatch = useDispatch();

    const { currentNode, anchor, timeCount } = useSelector(
      (state) => state.withdrawals
    );
    const lastNode = useRef(currentNode);

    useEffect(() => {
      dispatch(setTransition(false));

      setTimeout(() => {
        setShowTitle(1);
      }, 1000);
      return () => {
        dispatch(resetNode());
        //dispatch(resetTime());
      };
    }, []);

    useEffect(() => {
      if (currentNode.isLast) {
        setTitleImage(image2);
        setShowTitle(1);
      }
    }, [currentNode]);

    const handleAudio = (interrupted) => {
      //console.log(interrupted);
      dispatch(interruptAudio(interrupted));
    };

    const onAction = (id) => {
      dispatch(setCurrentNode(currentNode.descendants[id].node || 0));
      lastNode.current = currentNode;
      setShowQuotes(1);
      //dispatch(addTime(currentNode.time || 0));
    };

    const handleBack = () => {
      dispatch(setTransition(true));
      setTimeout(() => {
        dispatch(setSection("menu"));
      }, 1000);
    };

    const handleDialogClose = () => {
      setShowQuotes(0);
    };

    const onCloseGame = (stay, gameId = 0) => {
      dispatch(
        setCurrentNode(
          stay ? lastNode.current : currentNode.descendants[gameId].node
        )
      );
    };

    return (
      <Spring
        to={{
          x: currentNode.anchor.x * scale,
          y: currentNode.anchor.y * scale,
          anchor: [window.innerWidth / 2.1, window.innerHeight / 2],
        }}
        config={{ duration: 1000, easing: easeCubicInOut }}
      >
        {(props) => (
          <Container>
            <Container position={props.anchor}>
              <Container {...props} pivot={[0, scale * 983 * 2.5]}>
                <Sprite
                  image={rasterizeSVG(map, [
                    scale * 1593 * 2.5,
                    scale * 983 * 2.5,
                  ])}
                />
              </Container>
            </Container>
            {showAvatar && (
              <Container position={props.anchor} scale={scale}>
                <Avatar
                  anchor={currentNode.anchor}
                  prevDirection={lastNode.current.direction}
                  direction={currentNode.direction}
                  begin={avatarStart}
                />
              </Container>
            )}
            <Back click={handleBack} />
            {showAvatar && (
              <Quotes
                quotes={currentNode.quotes}
                visible={showQuotes}
                ageRange={[40, 60]}
              />
            )}
            {typeof currentNode.game !== "number" &&
              showAvatar &&
              !currentNode.isLast && (
                <Dialog
                  id={currentNode}
                  delay={
                    currentNode.anchor.x === lastNode.current.anchor.x &&
                    currentNode.anchor.y === lastNode.current.anchor.y
                      ? 0
                      : 2000
                  }
                  message={currentNode.message}
                  buttons={
                    currentNode.descendants
                      ? currentNode.descendants.map((e, i) => {
                          e.key = i;
                          //console.log(e);
                          return e.hint;
                        })
                      : []
                  }
                  type={currentNode.type}
                  action={onAction}
                  currentNode={currentNode}
                  addTime={addTime}
                  onClose={handleDialogClose}
                />
              )}
            <GameContainer
              descendants={currentNode.descendants}
              id={currentNode.game}
              lastId={lastNode.current && lastNode.current.game}
              close={(stay, gameId) => onCloseGame(stay, gameId)}
            />
            <TitleContainer
              image={titleImage}
              video={
                "https://alucinaprojects.s3.us-west-2.amazonaws.com/profuturo/Profuturo-Video-Retiro.mp4"
              }
              scale={showTitle}
              isLast={currentNode.isLast}
              onVideoVisible={() => handleAudio(true)}
              close={() => {
                if (currentNode.isLast) handleBack();
                setShowTitle(0);
                setShowAvatar(true);
                setAvatarStart(false);
                handleAudio(false);
              }}
            />
            <TimeCount time={timeCount} />
          </Container>
        )}
      </Spring>
    );
  };

  return <Animated />;
}

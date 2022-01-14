import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import map from "../../assets/registry/map.js";
import Back from "../../baseComponents/Back";
import Dialog from "../../baseComponents/Dialog";
import {
  setCurrentNode,
  resetNode,
} from "../../redux/features/registry/registry";
import { Spring } from "react-spring";
import {
  AnimatedSprite,
  Container,
  Sprite,
  TilingSprite,
  useApp,
} from "@inlet/react-pixi/animated";
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
import Avatar from "../Registry/components/Avatar";
import TimeCount from "./components/TimeCount.js";
import laptop from "../../assets/anim/laptop.json";
import trees from "../../assets/map/trees/tree1.png";
import TitleContainer from "../../baseComponents/TitleContainer.js";
import image from "../../assets/registry/intrucciones_juego01.png";
import image2 from "../../assets/registry/intrucciones_juego01.png";
import useWindowSize from "../../utils/useWindowSize";
import ReactLottie from "../../baseComponents/ReactLottie.js";
import Quotes from "../../baseComponents/Quotes.js";
import { addTime } from "../../redux/features/registry/time";
import * as PIXI from "pixi.js";
import clock from "../../assets/clock.js";
import clock2 from "../../assets/salon.png";
import rasterizeSVG from "../../utils/rasterizeSVG.js";
import {
  setAudio,
  resetAudio,
  interruptAudio,
} from "../../redux/features/audio.js";
import audio1 from "../../assets/audio/Traspaso- Sin nombre de AFORE ‐ Made with Clipchamp.mp3";
import audio2 from "../../assets/audio/APOVOL 2 ‐ Made with Clipchamp.mp3";
import audio3 from "../../assets/audio/Retiro por Desempleo ‐ Made with Clipchamp.mp3";
import audio4 from "../../assets/audio/Actualización de datos 1 ‐ Made with Clipchamp.mp3";

export default function Index() {
  const spring = { mass: 1, tension: 100, friction: 50 };

  const Animated = () => {
    const windowSize = useWindowSize();
    const app = useApp();
    const [frames, setFrames] = useState([]);
    const spritesheet =
      "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";
    const scale = window.innerWidth / 1536;
    const [showTitle, setShowTitle] = useState(0);
    const [titleImage, setTitleImage] = useState(image);
    const [showAvatar, setShowAvatar] = useState(false);
    const [avatarStart, setAvatarStart] = useState(true);
    const [showQuotes, setShowQuotes] = useState(1);
    const audios = [audio1, audio2, audio3, audio4];
    const dispatch = useDispatch();

    const { currentNode, anchor } = useSelector((state) => state.registry);
    const lastNode = useRef(currentNode);

    /*
    useEffect(() => {
      console.log("UPDATE");
    });
    console.log("RENDER");
    */

    useEffect(() => {
      /*
      dispatch(setTransition(false));

      setTimeout(() => {
        setShowTitle(1);
      }, 1000);
      return () => {
        dispatch(resetNode());
        //dispatch(resetTime());
      };
      */
    }, []);

    useEffect(() => {
      const a = document.createElement("div");

      a.innerHTML += clock;

      let width = Math.round(100 * scale);
      let height = Math.round(100 * scale);

      a.firstElementChild.setAttribute("width", width);
      a.firstElementChild.setAttribute("height", height);

      app.loader
        .add(
          "clock",
          new XMLSerializer().serializeToString(
            a.firstElementChild.cloneNode(true)
          )
        )
        .load((_, resource) => {
          let sheet = new PIXI.BaseTexture.from(
            app.loader.resources["clock"].url
          );
          let w = Math.round(width / 5);
          let h = Math.round(height);

          setFrames([
            new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
          ]);

          setTimeout(() => {
            dispatch(setTransition(false));

            setTimeout(() => {
              if (!showTitle) setShowTitle(1);
            }, 1000);
          }, 500);
          return () => {
            dispatch(resetNode());
            //dispatch(resetTime());
          };
        });
      return () => {
        app.loader.reset();
      };
    }, []);

    useEffect(() => {
      if (currentNode.isLast) {
        setTitleImage(image2);
        setShowTitle(1);
      }
      if (typeof currentNode.audio === "number") {
        dispatch(setAudio(audios[currentNode.audio]));
      } else {
        dispatch(resetAudio());
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
      //console.log(gameId);
      dispatch(
        setCurrentNode(
          stay ? lastNode.current : currentNode.descendants[gameId].node
        )
      );
    };

    /*
      {!!frames.length && (
        <Container position={[925 * scale, 2925 * scale]}>
          <AnimatedSprite
            position={[0, 0]}
            textures={frames}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.25}
          />
        </Container>
      )}
    */

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
              <Container {...props} pivot={[0, scale * 1417 * 2.5]}>
                <Sprite
                  image={rasterizeSVG(map, [
                    scale * 2306 * 2.5,
                    scale * 1417 * 2.5,
                  ])}
                />
                <Sprite
                  image={trees}
                  position={[925 * scale, 2925 * scale]}
                  scale={scale}
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
                ageRange={[20, 40]}
              />
            )}
            {typeof currentNode.game !== "number" &&
              showAvatar &&
              !currentNode.isLast && (
                <Dialog
                  id={currentNode}
                  direction={currentNode.direction}
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
              buttonsPosition={[
                window.innerWidth / 4.8,
                window.innerHeight / 2 + 200 * scale,
              ]}
            />
            <TimeCount setFinalScore={currentNode.isLast} />
          </Container>
        )}
      </Spring>
    );
  };

  return <Animated />;
}

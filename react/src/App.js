import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Stage } from "@inlet/react-pixi/animated";
import useWindowSize from "./app/utils/useWindowSize";
import Map from "./app/scenarios/Map/Index";
import Welcome from "./app/components/Welcome";
import { Provider, useSelector } from "react-redux";
import store from "./app/redux/store";
import Transition from "./app/scenarios/Transition";
import Registry from "./app/scenarios/Registry/Index";
import rotate from "./app/assets/girar.svg";
import GameHTMLContainer from "./app/baseComponents/GameContainer/components/GameHTMLContainer";
import Withdrawals from "./app/scenarios/Withdrawals/Index";
import AudioPlayer from "./app/components/AudioPlayer";
import VideoContainer from "./app/baseComponents/VideoContainer";
import CommentContainer from "./app/baseComponents/CommentContainer";

function App() {
  useWindowSize();
  const { section } = useSelector((state) => state.general);
  const { currentAudio, interrupted } = useSelector((state) => state.audio);
  const [isFirstRender, setFirstRender] = useState(true);
  const config = {
    size: { width: window.innerWidth, height: window.innerHeight },
    stage: {
      antialias: true,
      backgroundColor: 0xf2f8ff,
    },
  };

  const [content, setContent] = useState(<Map />);
  const audio = useRef(new Audio(currentAudio));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!interrupted && playing) {
      audio.current.loop = true;
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [playing, interrupted]);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
    } else {
      audio.current.src = currentAudio;
      setPlaying(false);
      setTimeout(() => {
        setPlaying(true);
      }, 500);
    }
  }, [currentAudio]);

  useEffect(() => {
    switch (section) {
      case "registry":
        setContent(<Registry />);
        break;
      case "withdrawals":
        setContent(<Withdrawals />);
        break;
      case "map":
        setContent(<Map />);
        break;
      default:
        setContent(<Map />);
        break;
    }
  }, [section]);

  const handleAudio = (playing) => {
    setPlaying(playing);
  };

  return (
    <>
      <div
        className="App"
        style={{ width: window.innerWidth, height: window.innerHeight }}
      >
        <div className="stage">
          <Stage {...config.size} options={config.stage}>
            <Provider store={store}>
              <Transition>{content}</Transition>
            </Provider>
          </Stage>
        </div>

        <GameHTMLContainer />
        <VideoContainer />
        <CommentContainer />
        <Welcome onClose={() => handleAudio(true)} />
        {window.matchMedia("(orientation: portrait)").matches && (
          <div className="portrait-warning">
            <img src={rotate} />
          </div>
        )}
        <AudioPlayer
          isPlaying={!interrupted && playing}
          onPlay={() => handleAudio(true)}
          onPause={() => handleAudio(false)}
        />
      </div>
    </>
  );
}

export default App;

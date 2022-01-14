import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import salon from "../assets/salon.png";
import { setAppActive } from "../redux/features/general";
import { setMapActive, setMapPosition } from "../redux/features/map/map";
import useScale from "../utils/useScale";

export default function Welcome({ onClose }) {
  const scale = useScale();
  const holdClick = useRef(false);
  const hello = useRef();
  const dispatch = useDispatch();
  const mouseDown = (e) => {
    e.target.classList.add("active");
    holdClick.current = true;
    setTimeout(() => {
      if (!holdClick.current) {
        e.target.classList.remove("active");
      }
      holdClick.current = false;
    }, 200);
  };
  const mouseUp = (e) => {
    if (!holdClick.current) {
      e.target.classList.remove("active");
    }
    holdClick.current = false;
    hello.current.classList.add("hidden");
    document.querySelector(".stage").classList.add("open");
    dispatch(setMapActive(true));
    dispatch(
      setMapPosition({
        x: (window.innerWidth / 2) * -0.01,
        y:
          -(1400 * scale - window.innerHeight) -
          (window.innerHeight / 2) * -0.01,
      })
    );
    onClose();
  };
  return (
    <div ref={hello} className="hello">
      <img alt="" src={salon} />
      <p>
        Entra a las diferentes etapas de vida de un cliente y conoce lo que más
        valoran, los puntos de dolor y las emociones en cada una, ¿estás listo
        para ver a través de los ojos de nuestros clientes?
      </p>
      <span
        className="noselect"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onTouchStart={mouseDown}
        onTouchEnd={mouseUp}
      >
        ENTRAR AL MAPA
      </span>
    </div>
  );
}

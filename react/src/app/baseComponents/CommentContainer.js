import React, { useState } from "react";

export default function CommentContainer() {
  const [isBtnPressed, setBtnPressed] = useState();

  const mouseUp = () => {
    setBtnPressed(false);
  };

  const mouseDown = () => {
    setBtnPressed(true);
  };

  return (
    <div className="commentContainer">
      <div className="title">
        Ahora que viviste esta experiencia como cliente ¿Qué harías tú para
        mejorarla?
      </div>
      <textarea className="txt"></textarea>
      <span
        className={"btn" + (isBtnPressed ? " active" : "")}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        Enviar
      </span>
    </div>
  );
}

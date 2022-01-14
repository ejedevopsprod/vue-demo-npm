import React, { useRef, useEffect, useState, useCallback } from "react";
import { Container, Sprite, Graphics } from "@inlet/react-pixi/animated";

import sendSprite from "../../../assets/games/messageGame/btnenviar.png";
import initialMessage from "../../../assets/games/messageGame/messages/inicial.png"
import helloMessage from "../../../assets/games/messageGame/messages/hola.png"
import hello2Message from "../../../assets/games/messageGame/messages/hola_2.png"
import greetingMessage from "../../../assets/games/messageGame/messages/que_tal.png"
import goodMorningMessage from "../../../assets/games/messageGame/messages/buen_dia.png"
import goodAfternoonMessage from "../../../assets/games/messageGame/messages/buenas_tardes.png"
import helloInput from "../../../assets/games/messageGame/texto/hola.png"
import hello2Input from "../../../assets/games/messageGame/texto/hola_2.png"
import greetingInput from "../../../assets/games/messageGame/texto/que_tal.png"
import goodMorningInput from "../../../assets/games/messageGame/texto/buen_dia.png"
import goodAfternoonInput from "../../../assets/games/messageGame/texto/buenas_tardes.png"

const visualMessages = [
  { message: helloMessage, input: helloInput },
  { message: hello2Message, input: hello2Input },
  { message: greetingMessage, input: greetingInput },
  { message: goodMorningMessage, input: goodMorningInput },
  { message: goodAfternoonMessage, input: goodAfternoonInput }
]

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Message = ({
  onClick = () => null,
  visible = true
}) => {
  const [messages, setMessages] = useState([initialMessage]);
  const [currentMessage, setCurrentMessage] = useState(visualMessages[getRandom(0, visualMessages.length - 1)]);
  const [borderVisible, setBorderVisible] = useState(false);
  const [buttonTouched, setButtonTouched] = useState(false);
  const borderRef = useRef(null);

  const onPressHandler = () => {
    setButtonTouched(true);
    setBorderVisible(false);
    clearInterval(borderRef.current);
    setMessages([...messages, currentMessage.message]);
    setCurrentMessage(visualMessages[getRandom(0, visualMessages.length - 1)]);
    onClick();
  }

  const container = useCallback((graphics) => {
    graphics.clear();
    graphics.lineStyle(5, 0x127ee0, 1);
    graphics.drawRoundedRect(330, 0, 100, 50, 50);
    graphics.endFill();
  }, []);

  useEffect(() => {
    console.log(!buttonTouched)
    if (!buttonTouched)
      borderRef.current = setInterval(() => { setBorderVisible(!borderVisible) }, 500);
    return () => clearInterval(borderRef.current);
  }, [borderVisible]);

  return <Container visible={visible} position={{ x: 370, y: 680 }} zIndex={100}>
    {
      messages.map((value, i) => {
        if (i === 0) return <Sprite image={value} width={310} y={(-70 * messages.length) - 50} height={100} x={100} zIndex={i} />
        if (i === messages.length - 1) return <Sprite image={value} width={220} y={-70} height={50} x={210} zIndex={i} />
        return <Sprite image={value} width={220} y={-70 * ((messages.length) - i)} height={50} x={210} zIndex={i} />
      })
    }
    <Sprite image={currentMessage.input} width={310} height={50} />
    <Container
      interactive={true}
      cursor="pointer"
      pointerup={onPressHandler}
    >
      <Sprite image={sendSprite} width={100} height={50} x={330} />
      <Graphics visible={borderVisible} draw={container} zIndex={3} />
    </Container>
  </Container>
}

export default Message

import React, { useEffect, useState } from "react";
import medal from "../../../assets/medal.svg";
import { getPlayers } from "../../../services/users";

export default function Rank() {
  let [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then((res) => setPlayers(res.data));
  }, []);

  return (
    <div id="rank">
      <div className="header">
        <img alt="medalla" src={medal} className="medal" />
        <div className="user">{players.length && players[0].user_name}</div>
        <div className="score">{players.length && players[0].total_score}</div>
      </div>
      <div className="list">
        {players.map((e, i) => (
          <div key={i} className="item">
            <div className="left">
              <div className="num">{i + 2}</div>
              <div>{e.user_name}</div>
            </div>
            <div>{e.total_score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

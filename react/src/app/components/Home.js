import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import salon from "../assets/salon.png";

export default function Home() {
  return (
    <div id="main">
      <img alt="Salón del cliente" src={salon} />
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button variant="outlined">Iniciar sesión</Button>
      </Link>
    </div>
  );
}

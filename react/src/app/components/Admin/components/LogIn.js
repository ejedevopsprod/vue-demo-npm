import { Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/features/user";
import { adminLogIn } from "../../../services/users";

export default function Okta() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogIn = () => {
    adminLogIn(userName, password).then((res) => {
      if (res.status === 200) {
        dispatch(setUser("Admin"));
        navigate("/admin");
      }
    });
  };

  const handleUser = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id="admin-login">
      <div>
        <div className="txt">Iniciar como administrador</div>
        <TextField
          id="outlined-basic"
          label="Usuario"
          variant="outlined"
          value={userName}
          onChange={handleUser}
        />
        <TextField
          id="outlined-basic"
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <Button variant="contained" onClick={handleLogIn}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}

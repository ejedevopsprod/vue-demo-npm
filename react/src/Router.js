import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Admin from "./app/components/Admin";
import LogIn from "./app/components/Admin/components/LogIn";
import Okta from "./app/components/Okta";
import Home from "./app/components/Home";
import App from "./App";

export default function Router() {
  const { session } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <App /> : <Home />} />
        <Route path="/admin" element={session ? <Admin /> : <LogIn />} />
        <Route path="/admin/login" element={<LogIn />} />
        <Route path="/login" element={<Okta />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

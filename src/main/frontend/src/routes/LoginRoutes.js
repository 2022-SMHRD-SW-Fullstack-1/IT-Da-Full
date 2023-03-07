import {useEffect, React, useState} from "react";
import uuid from 'react-uuid';
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";
import E_Register from "../pages/Account/E_Register";

const LoginRoutes = ({socket, connect}) => {

  const [id, setId] = useState(uuid())

  useEffect(() => {
    connect(id)
 }, [])

  return (
    <Routes>
      <Route path="/" element={<Login socket={socket}/>} />
      <Route path="/register" element={<Register socket={socket}/>} />
      <Route path="/e_register" element={<E_Register socket={socket}/>} />
    </Routes>
  );
};

export default LoginRoutes;

import jwtDecode from "jwt-decode";
import React, { createContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { LoginCard } from "./components/login-card/LoginCard";
import { MainCard } from "./components/main-card/MainCard";
import { RegisterCard } from "./components/register-card/RegisterCard";
interface JWTPayload {
  id: number;
  username: string;
  email: string;
  exp: number;
}

function App() {
  const navigation = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    //Si token no esta en local storage, redirigir a login
    if (!token) {
      navigation("/login");
      return;
    }
    //Si token esta en local storage, verificar que no haya expirado
    const { exp } = jwtDecode<JWTPayload>(token);
    if (exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      navigation("/login");
    }
    //Si no expiro, redirigir a main
    navigation("/");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainCard />} />
      <Route path="/login" element={<LoginCard />} />
      <Route path="/register" element={<RegisterCard />} />
    </Routes>
  );
}

export default App;

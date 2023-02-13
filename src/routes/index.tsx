import { Routes, Route } from "react-router-dom";
import { ControlPainelAdminPage } from "../pages/ControlPainelAdmin";


import { LoginPage } from "../pages/Login";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="controlPainelAdmin" element={<ControlPainelAdminPage />} />
    </Routes>
  );
};

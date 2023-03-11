import { Routes, Route } from "react-router-dom";
import { ControlPainelAdminPage } from "../pages/DashboardAdmin/ControlPainelAdmin";
import { ParkingSlotsManagementPage } from "../pages/DashboardAdmin/ParkingSlotsManagement";
import { WorksManagement } from "../pages/DashboardAdmin/WorkersManagment";
import { ControlPainelEmployee } from "../pages/DashboardEmployee/ControlPainelEmployee";

import { LoginPage } from "../pages/Login";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/controlPainelAdmin" element={<ControlPainelAdminPage />} />
      <Route path="/admin/worksManagement" element={<WorksManagement />} />
      <Route
        path="/admin/parkingManagement"
        element={<ParkingSlotsManagementPage />}
      />
      <Route
        path="/employee/controlPainel"
        element={<ControlPainelEmployee />}
      />
    </Routes>
  );
};

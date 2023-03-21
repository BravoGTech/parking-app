import { Routes, Route } from "react-router-dom";
import { ControlPainelAdminPage } from "../pages/DashboardAdmin/ControlPainelAdmin";
import { ParkingSlotsManagementPage } from "../pages/DashboardAdmin/ParkingSlotsManagement";
import { ReportsPage } from "../pages/DashboardAdmin/Reports";
import { WorksManagement } from "../pages/DashboardAdmin/WorkersManagment";
import { ControlPainelEmployee } from "../pages/DashboardEmployee/ControlPainelEmployee";
import { ParkingSlotsPage } from "../pages/DashboardEmployee/ParkingSlotsManagement";

import { LoginPage } from "../pages/Login";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/controlPainelAdmin" element={<ControlPainelAdminPage />} />
      <Route path="/worksManagementAdmin" element={<WorksManagement />} />
      <Route
        path="/parkingManagementAdmin"
        element={<ParkingSlotsManagementPage />}
      />
      <Route
        path="/reportsAdmin"
        element={<ReportsPage />}
      />
      <Route
        path="/employee/controlPainel"
        element={<ControlPainelEmployee />}
      />
      <Route path="/employee/parkingSlot" element={<ParkingSlotsPage />} />
    </Routes>
  );
};

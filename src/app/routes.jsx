import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import PrivateRoutes from "../components/PrivateRoutes";
import MenuHandler from "../pages/MenuHandler";

export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route path="/" element={<Home />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<MenuHandler />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

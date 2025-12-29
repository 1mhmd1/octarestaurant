import Dashboard from "./pages/Dashboard.jsx";
import ControlMenu from "./pages/ControlMenu.jsx";
import ControlRestaurants from "./pages/ControlRestaurants.jsx";
import AdminLayout from "./AdminLayout.jsx";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<ControlMenu />} />
        <Route path="restaurants" element={<ControlRestaurants />} />
      </Route>
    </Routes>
  );
}

export default App;

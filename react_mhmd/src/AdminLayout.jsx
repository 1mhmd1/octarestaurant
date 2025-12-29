import AdminNavBar from "./components/AdminNavBar";
import AdminSideBar from "./components/AdminSideBar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <AdminSideBar />

      <div className="flex-1 flex flex-col">
        <AdminNavBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

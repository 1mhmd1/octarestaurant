import { NavLink } from "react-router-dom";
function AdminNav() {
  return (
    <nav className="w-64 min-h-screen bg-white flex flex-col px-4 py-6 border-r ">
      <div className="w-full   ">
        <div className="h-20 w-32 ">
          <a href="">
            <img src="/logo.png" alt="" />
          </a>
        </div>
        <div className="">
          <p>View Store</p>
        </div>
      </div>

      <div className=" flex flex-col gap-3">
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-orange-500 text-white px-4 py-2 rounded block transition"
              : "bg-gray-100 hover:bg-red-500 px-4 py-2 rounded block transition"
          }
        >
          <i className="fa-solid fa-gauge"></i> Dashboard
        </NavLink>
        <NavLink
          to="/admin/restaurants"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-orange-500 text-white px-4 py-2 rounded block transition"
              : "bg-gray-100 hover:bg-red-500 px-4 py-2 rounded block transition"
          }
        >
          <i className="fa-solid fa-store"></i> Restaurent
        </NavLink>
        <NavLink
          to="/admin/menu"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-orange-500 text-white px-4 py-2 rounded block transition"
              : "bg-gray-100 hover:bg-red-500 px-4 py-2 rounded block transition"
          }
        >
          <i className="fa-solid fa-utensils"> </i> Menu
        </NavLink>
      </div>
    </nav>
  );
}
export default AdminNav;

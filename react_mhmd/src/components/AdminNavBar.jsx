import { NavLink, Link } from "react-router-dom";

function AdminNavBar() {
  return (
    <header className="lg:hidden bg-white border-b ">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-0 ">
          <img src="/OctaDine.png" alt="logo" className="h-12 w-22 " />
          <span className="font-bold ">Admin</span>
        </div>

        <Link to="/store" className="text-sm text-gray-500 hover:text-black">
          View Store
        </Link>
      </div>

      <nav className="px-4 pb-3">
        <div className="flex gap-2">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-full bg-orange-500 text-white font-medium text-sm"
                : "px-4 py-2 rounded-full  bg-gray-100 text-gray-700 font-semibold text-sm"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/restaurants"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-full bg-orange-500 text-white font-medium text-sm"
                : "px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm"
            }
          >
            Restaurants
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-full bg-orange-500 text-white font-medium text-sm"
                : "px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm"
            }
          >
            Menu Items
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AdminNavBar;

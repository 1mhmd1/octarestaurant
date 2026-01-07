import { NavLink, Link } from "react-router-dom";

function AdminSideBar() {
  return (
    <aside className="hidden lg:flex w-64 min-h-screen border-r">
      <nav className="w-64 min-h-screen bg-white flex flex-col px-4 py-6 border-r -mt-4">
        <div className="h-18 w-32">
          <Link to="/" className="flex items-center pr-5">
            <img src="/OctaDine.png" className="h-16 w-24" alt="logo" />
            <div className="flex flex-col  gap-2 ">
              <p className="font-bold text-md whitespace-nowrap ">
                All Restaurents
              </p>
              <p className="text-xs font-medium text-gray-500 whitespace-nowrap">
                Admin panel
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 font-bold text-white px-4 py-2 rounded-xl text-lg h-12  block "
                : " hover:bg-orange-300/30  text-gray-500  text-lg  rounded-xl font-medium hover:text-orange-700 px-4 py-2 rounded block transition"
            }
          >
            <i className="fa-solid fa-gauge mr-2"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/restaurants"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 font-bold text-white px-4 py-2 rounded-xl text-lg h-12 block "
                : " hover:bg-orange-300/30  text-gray-500  text-lg  rounded-xl font-medium hover:text-orange-700 px-4 py-2 rounded block transition"
            }
          >
            <i className="fa-solid fa-store mr-2"></i>
            Restaurants
          </NavLink>

          <NavLink
            to="/admin/menu"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-orange-500 font-bold text-white px-4 py-2 rounded-xl text-lg h-12 block "
                : " hover:bg-orange-300/30  text-gray-500  text-lg  rounded-xl font-medium hover:text-orange-700 px-4 py-2 rounded block transition"
            }
          >
            <i className="fa-solid fa-utensils mr-2"></i>
            Menu Items
          </NavLink>
        </div>

        <div className="mt-auto pt-4 ">
          <NavLink
            to="/store"
            className="flex items-center gap-2 text-gray-500
                     hover:text-black transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back to Store
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default AdminSideBar;

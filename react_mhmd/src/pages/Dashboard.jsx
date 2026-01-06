import DashboardCards from "../components/DashboardCards";
import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

function Dashboard() {
  const [stats, setStats] = useState({
    restaurants: 0,
    menuItems: 0,
    orders: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE}/restaurantAPIs/dashboard-stats.php`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }
        return res.json();
      })
      .then((data) => {
        setStats({
          restaurants: data.restaurants ?? 0,
          menuItems: data.menu_items ?? 0,
          orders: data.orders ?? 0,
        });
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col -mt-2">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500 font-normal -mt-3 text-lg">
          Welcome to{" "}
          <span className="text-orange-500 font-bold">OctaDine </span>
          Admin Panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <DashboardCards
          icon="fa-solid fa-store"
          value={stats.restaurants}
          title="Total Restaurants"
        />

        <DashboardCards
          icon="fa-solid fa-utensils"
          value={stats.menuItems}
          title="Menu Items"
        />

        <DashboardCards
          icon="fa-solid fa-bag-shopping"
          value={stats.orders}
          title="Total Orders"
        />
      </div>
    </div>
  );
}

export default Dashboard;

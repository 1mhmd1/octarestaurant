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
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        return res.json();
      })
      .then((data) => {
        setStats({
          restaurants: data.restaurants ?? 0,
          menuItems: data.menu_items ?? 0,
          orders: data.orders ?? 0,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 text-lg">
          Welcome to <span className="text-orange-500 font-bold">OctaDine</span>{" "}
          Admin Panel
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCards
          icon="fa-solid fa-store"
          value={stats.restaurants}
          title="Total Restaurants"
          bgColor="bg-orange-50"
          iconColor="text-orange-500"
        />

        <DashboardCards
          icon="fa-solid fa-utensils"
          value={stats.menuItems}
          title="Menu Items"
          bgColor="bg-orange-50"
          iconColor="text-orange-500"
        />

        <DashboardCards
          icon="fa-solid fa-bag-shopping"
          value={stats.orders}
          title="Total Orders"
          bgColor="bg-[rgba(34,195,93,0.1)]"
          iconColor="text-[rgba(34,195,93,1)]"
        />
      </div>
    </div>
  );
}

export default Dashboard;

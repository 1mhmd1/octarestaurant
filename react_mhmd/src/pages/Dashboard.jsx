import DashboardCards from "../components/DashboardCards";
import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    restaurants: 0,
    menuItems: 0,
    orders: 0,
  });

  useEffect(() => {
    fetch("http://localhost/restaurants/backend/restaurantAPIs/getRests.php")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          restaurants: data.restaurants,
          menuItems: data.menu_items,
          orders: data.orders,
        });
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
  );
}

export default Dashboard;

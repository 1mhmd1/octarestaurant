// import Dashboard from "./pages/Dashboard.jsx";
// import ControlMenu from "./pages/ControlMenu.jsx";
// import ControlRestaurants from "./pages/ControlRestaurants.jsx";
// import AdminLayout from "./AdminLayout.jsx";
// import { Routes, Route } from "react-router-dom";
// function App() {
//   return (
//     <Routes>
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="menu" element={<ControlMenu />} />
//         <Route path="restaurants" element={<ControlRestaurants />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import { API_BASE } from "./config/api";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/getRests.php`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((json) => {
        setRestaurants(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Restaurants</h1>

      {restaurants.map((r) => (
        <div
          key={r.rest_id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h3>{r.name}</h3>
          <p>{r.description}</p>
          <span>{r.location}</span>
        </div>
      ))}
    </div>
  );
}

export default App;

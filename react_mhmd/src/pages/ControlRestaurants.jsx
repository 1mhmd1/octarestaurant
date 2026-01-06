import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";
import AddRest from "../components/AddRest";
import EditRest from "../components/EditRest";

function ControlRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // ⬅️ أول تحميل فقط
  const [searching, setSearching] = useState(false); // ⬅️ أثناء البحث
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRestId, setSelectedRestId] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✏️ Edit
  const handleEdit = (id) => {
    setSelectedRestId(id);
    setShowEdit(true);
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/restaurantAPIs/deleteRest.php?rest_id=${id}`
      );
      const data = await res.json();

      if (data.status !== "The restaurant is deleted") {
        throw new Error("Delete failed");
      }

      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ⏱️ Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔍 Fetch data
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      // 🔹 فرق بين تحميل أولي وبحث
      if (initialLoading) {
        setInitialLoading(true);
      } else {
        setSearching(true);
      }

      setError(null);

      try {
        let url = `${API_BASE}/restaurantAPIs/getRests.php`;

        if (debouncedSearch.trim() !== "") {
          url = `${API_BASE}/restaurantAPIs/searchRest.php?name=${encodeURIComponent(
            debouncedSearch
          )}`;
        }

        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        if (Array.isArray(data)) {
          setRestaurants(
            data.map((r) => ({
              id: r.rest_id,
              name: r.name,
              description: r.description,
              location: r.location,
              phone: r.phone,
              openingHours: r.opening_hours,
              image: r.image || "placeholder.png",
            }))
          );
        } else if (data.status === "success") {
          setRestaurants(
            data.data.map((r) => ({
              id: r.rest_id,
              name: r.name,
              description: r.description,
              location: r.location,
              phone: r.phone,
              openingHours: r.opening_hours,
              image: r.image || "placeholder.png",
            }))
          );
        } else {
          setRestaurants([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Unable to load restaurants");
          setRestaurants([]);
        }
      } finally {
        setInitialLoading(false);
        setSearching(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [debouncedSearch]);

  // 🛑 Loading أولي فقط
  if (initialLoading) {
    return <p className="text-gray-500">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Restaurants
          <span className="text-gray-400 text-base ml-2">
            {restaurants.length} restaurants
          </span>
        </h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Restaurant
        </button>
      </div>
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search restaurants by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 pr-10"
        />

        {searching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${API_BASE}/uploads/${rest.image}`}
                alt={rest.name}
                className="w-20 h-20 rounded-xl object-cover"
                onError={(e) => {
                  e.target.src = `${API_BASE}/uploads/placeholder.png`;
                }}
              />

              <div>
                <h2 className="font-bold text-lg">{rest.name}</h2>
                <p className="text-gray-500">{rest.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEdit(rest.id)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✏️
              </button>

              <button
                onClick={() => handleDelete(rest.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                Open
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <AddRest
          onClose={() => setShowAdd(false)}
          onSuccess={() => setShowAdd(false)}
        />
      )}

      {showEdit && (
        <EditRest
          restId={selectedRestId}
          onClose={() => setShowEdit(false)}
          onSuccess={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}

export default ControlRestaurants;

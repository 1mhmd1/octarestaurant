import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

function EditMenu({ restId, onClose }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/menu/displayCategories.php?rest_id=${restId}`
      );
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  };

  // Fetch menu items
  // =========================
  const fetchMenuItems = async (catId) => {
    try {
      const res = await fetch(
        `${API_BASE}/menu/displayMenu.php?food_cat_id=${catId}`
      );
      const data = await res.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch {
      setMenuItems([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/menu/addCategory.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategory,
          rest_id: restId,
        }),
      });

      const data = await res.json();
      if (data.status !== "success") throw new Error("Failed to add category");

      setNewCategory("");
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async () => {
    if (!selectedCategory || !newItem.name || !newItem.price) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/menu/addMenu.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rest_id: restId,
          food_cat_id: selectedCategory.food_cat_id,
          name: newItem.name,
          price: newItem.price,
        }),
      });

      const data = await res.json();
      if (data.status !== "success") throw new Error("Failed to add menu item");

      setNewItem({ name: "", price: "" });
      fetchMenuItems(selectedCategory.food_cat_id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Edit Menu (Restaurant #{restId})
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Categories</h3>

          <div className="flex gap-2 mb-3">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="border px-3 py-2 rounded w-full"
            />
            <button
              onClick={handleAddCategory}
              disabled={loading}
              className="bg-orange-500 text-white px-4 rounded"
            >
              + Add
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.food_cat_id}
                onClick={() => {
                  setSelectedCategory(cat);
                  fetchMenuItems(cat.food_cat_id);
                }}
                className={`px-3 py-1 rounded border ${
                  selectedCategory?.food_cat_id === cat.food_cat_id
                    ? "bg-orange-500 text-white"
                    : ""
                }`}
              >
                {cat.food_cat_name}
              </button>
            ))}
          </div>
        </div>

        {}
        {selectedCategory && (
          <div>
            <h3 className="font-semibold mb-2">
              Menu Items – {selectedCategory.food_cat_name}
            </h3>

            <div className="space-y-2 mb-4">
              {menuItems.map((item) => (
                <div
                  key={item.food_id}
                  className="flex justify-between border rounded px-3 py-2"
                >
                  <span>{item.food_name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>

            {}
            <div className="flex gap-2">
              <input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <input
                placeholder="Price"
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="border px-3 py-2 rounded w-32"
              />
              <button
                onClick={handleAddMenuItem}
                disabled={loading}
                className="bg-green-600 text-white px-4 rounded"
              >
                + Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditMenu;

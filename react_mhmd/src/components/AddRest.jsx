import { useState } from "react";
import { API_BASE } from "../config/api";

function AddRest({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    phone: "",
    opening_hours: "",
    categories: "",
  });

  const [image, setImage] = useState(null); // ✅ جديد
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ✅ FormData بدل JSON
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("phone", form.phone);
      formData.append("opening_hours", form.opening_hours);

      formData.append(
        "categories",
        JSON.stringify(
          form.categories
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        )
      );

      // ✅ الصورة (اختياري)
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${API_BASE}/restaurantAPIs/createRest.php`, {
        method: "POST",
        body: formData, // ⚠️ لا headers
      });

      const data = await res.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Failed to add restaurant");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Add Restaurant</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Restaurant name"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Address"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="opening_hours"
            placeholder="Opening hours (08:00 - 22:00)"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="categories"
            placeholder="Categories (comma separated)"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />

          {}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-5 py-2 rounded-lg"
            >
              {loading ? "Adding..." : "Add Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRest;

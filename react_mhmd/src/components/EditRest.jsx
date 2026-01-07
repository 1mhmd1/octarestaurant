import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

function EditRest({ restId, onSuccess, onClose }) {
  const [form, setForm] = useState({
    new_name: "",
    new_desc: "",
    new_loc: "",
    new_phone: "",
    new_opening_hours: "",
  });

  const [image, setImage] = useState(null); // ✅ جديد

  useEffect(() => {
    if (!restId) return;

    fetch(`${API_BASE}/restaurantAPIs/getDataToEditRest.php?rest_id=${restId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          new_name: data.name || "",
          new_desc: data.description || "",
          new_loc: data.location || "",
          new_phone: data.phone || "",
          new_opening_hours: data.opening_hours || "",
        });
      });
  }, [restId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = {};

    // ✅ إذا في صورة → FormData
    if (image) {
      const formData = new FormData();
      formData.append("rest_id", restId);

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("image", image);

      options = {
        method: "POST",
        body: formData,
      };
    }
    // ✅ بدون صورة → JSON (كما كان)
    else {
      options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rest_id: restId, ...form }),
      };
    }

    const res = await fetch(
      `${API_BASE}/restaurantAPIs/updateRest.php`,
      options
    );

    const data = await res.json();

    if (data.status === "success") {
      onSuccess();
      onClose();
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Restaurant</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="new_name"
            value={form.new_name}
            onChange={handleChange}
            placeholder="Restaurant name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <textarea
            name="new_desc"
            value={form.new_desc}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            name="new_loc"
            value={form.new_loc}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            name="new_phone"
            value={form.new_phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            name="new_opening_hours"
            value={form.new_opening_hours}
            onChange={handleChange}
            placeholder="Opening hours"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          {/* ✅ input الصورة (اختياري) */}
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
              className="bg-orange-500 text-white px-5 py-2 rounded-lg"
            >
              Update Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRest;

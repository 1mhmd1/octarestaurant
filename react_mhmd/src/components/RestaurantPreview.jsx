import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

function RestaurantPreview({ restId, onClose }) {
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restId) return;

    const fetchPreviewData = async () => {
      try {
        setLoading(true);

        const restRes = await fetch(
          `${API_BASE}/restaurantAPIs/getDataToEditRest.php?rest_id=${restId}`
        );
        const restData = await restRes.json();
        setRestaurant(restData);

        const menuRes = await fetch(
          `${API_BASE}/menuAPIs/getMenusByRestaurant.php?rest_id=${restId}`
        );
        const menuData = await menuRes.json();
        setMenus(menuData);

        let allFoods = [];
        for (let menu of menuData) {
          const foodRes = await fetch(
            `${API_BASE}/menuAPIs/getFoodsByMenu.php?menu_id=${menu.menu_id}`
          );
          const foodData = await foodRes.json();
          allFoods = [...allFoods, ...foodData];
        }
        setFoods(allFoods);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [restId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl">Loading preview...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        {}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        {}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <p className="text-gray-500">{restaurant.location}</p>
          <p className="text-sm mt-2">{restaurant.description}</p>
        </div>

        {}
        {menus.map((menu) => (
          <div key={menu.menu_id} className="mb-6">
            <h3 className="text-xl font-semibold mb-3">🍽 {menu.name}</h3>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foods
                .filter((f) => f.menu_id === menu.menu_id)
                .map((food) => (
                  <div
                    key={food.food_id}
                    className="border rounded-xl p-4 flex gap-4"
                  >
                    <img
                      src={food.image_url}
                      alt={food.title}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = `${API_BASE}/uploads/placeholder.png`;
                      }}
                    />

                    <div>
                      <h4 className="font-bold">{food.title}</h4>
                      <p className="text-sm text-gray-500">
                        {food.description}
                      </p>
                      <p className="font-semibold mt-1">${food.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {menus.length === 0 && (
          <p className="text-gray-400 text-center">No menu added yet.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantPreview;

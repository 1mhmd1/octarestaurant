import { useNavigate } from "react-router-dom";
function Favorite() {
  const navigate = useNavigate();
  return (
    <div className="flex relative items-center justify-center px-4 top-32">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <i className="fa-regular fa-heart text-3xl text-muted-foreground"></i>
        </div>
        <h2 className="text-2xl font-semibold mb-2">No favorites yet </h2>
        <p className="text-muted-foreground mb-6">Save your favorite restaurants for quick access</p>
        <button onClick={() => navigate("/")} className="px-6 py-3 rounded-full bg-primary text-white font-medium transition hover:opacity-95">
          Browse Restaurants
        </button>
      </div>
    </div>
  );
}
export default Favorite;
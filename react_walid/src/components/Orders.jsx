import { useNavigate } from "react-router-dom";
function Orders() {
  const navigate = useNavigate();
  return (
    <div className="flex relative items-center justify-center px-4 top-32">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <i className="fa-regular fa-rectangle-list text-3xl text-muted-foreground"></i>
        </div>
        <h2 className="text-2xl font-semibold mb-2">No orders yet </h2>
        <p className="text-muted-foreground mb-6">Your order history will appear here</p>
        <button onClick={() => navigate("/")} className="px-6 py-3 rounded-full bg-primary text-white font-medium transition hover:opacity-95">
          Start Ordering
        </button>
      </div>
    </div>
  );
}
export default Orders;
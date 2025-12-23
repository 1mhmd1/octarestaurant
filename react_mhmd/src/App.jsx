import AdminNav from './AdminNav.jsx'
import { Routes, Route,BrowserRouter } from "react-router-dom"


function App() {
  return (
    <div className="flex">
      <AdminNav />

      <main className="flex-1 p-6">
        <Routes>
          <Route path="/admin/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/admin/restaurants" element={<div>Restaurants Page</div>} />
          <Route path="/admin/menu" element={<div>Menu Page</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App

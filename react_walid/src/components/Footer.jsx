import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Footer() {
  const [activeCat, setActiveCat] = useState("home");
  const navigate = useNavigate();
  const buttons = [
    { id: "home", label: "Home", icon: "fa-regular fa-house", path: "/" },
    { id: "favorites", label: "Favorites", icon: "fa-regular fa-heart", path: "/favorites" },
    { id: "cart", label: "Cart", icon: "fa-brands fa-opencart", path: "/cart" },
    { id: "orders", label: "Orders", icon: "fa-regular fa-rectangle-list", path: "/orders" },];
  return (
    <footer className="sticky bottom-0 z-50 border-t-2 border-solid bg-white">
      <ul className="flex justify-between w-4/5 mx-auto p-4">
        {buttons.map((btn) => (
          <li key={btn.id}>
        <button onClick={() =>{ setActiveCat(btn.id); navigate(btn.path); }} className={` flex flex-col items-center gap-1 transition-colors duration-200
            ${activeCat === btn.id ? "text-primary" : "text-muted-foreground hover:text-black" }`} >
              <i className={`${btn.icon} text-xl `}></i>
              <span >{btn.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;

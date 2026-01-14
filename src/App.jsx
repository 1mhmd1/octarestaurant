import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Favorite from "./components/Favorite";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import RestMenu from "./components/RestMenu";
import Rest, { RestsProvider } from "./components/rest";
export default function App() {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Router>
        <RestsProvider>
      <NavBar/>
	  <main className="flex-grow">
      <Routes>
      <Route path="/" element={ <> <Rest/> </>}/>
      <Route path="/favorites" element={ <> <Favorite/> </>}/>
      <Route path="/cart" element={ <> <Cart/> </>}/>
      <Route path="/orders" element={ <> <Orders/> </>}/>
      <Route path="/restMenu/:id" element={<RestMenu />} />
    </Routes>
	</main>
      <Footer />
      </RestsProvider>
	  </Router>
    </div>
  );
}

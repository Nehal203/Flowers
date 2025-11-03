import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navb from "./components/Navb";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import About from "./components/About";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Wishlist from "./components/wishlist";
import { useEffect } from "react";

function AppContent() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navb onNavigate={handleNavigation} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigation} />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop onNavigate={handleNavigation} />} />
          <Route path="/shop/category/:categorySlug" element={<Shop />} />
          <Route path="/product/:productSlug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

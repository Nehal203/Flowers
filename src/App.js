import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
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
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/register";

function AppContent() {
  const navigate = useNavigate();

  const handleNavigation = (typeOrPath, slug) => {
    if (typeOrPath === 'product' && slug) {
      navigate(`/product/${slug}`);
    } else if (typeOrPath === 'category' && slug) {
      navigate(`/shop/category/${slug}`);
    } else if (typeof typeOrPath === 'string') {
      navigate(typeOrPath);
    }
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import {
  CartProvider,
  WishlistProvider,
  AuthProvider,
  useAuth
} from "./contexts";
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
import ForgotPassword from "./components/ForgotPassword";
import OrderConfirmation from "./components/OrderConfirmation";

import AdminDashboard from "./pages/Admin/Dashboard";
import DashboardHome from "./pages/Admin/DashboardHome";
import AdminLogin from "./pages/Admin/Login";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Customerman from "./pages/Admin/Customerman";
import Setting from "./pages/Admin/Setting";

const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  const isAdmin = localStorage.getItem('adminToken');

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
  
};

function AppContent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
          <Route path="/wishlist" element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          } />
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/order-confirmation" element={
            <PrivateRoute>
              <OrderConfirmation />
            </PrivateRoute>
          } />

          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } />
          <Route path="/register" element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin/login" element={
            <AdminLogin />
          } />
          <Route path="/admin" element={
            <AdminLayout />
          }>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customerman />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navb from "./components/Navb";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navb />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navb from "./components/Navb";
import Home from "./components/Home";
import Footer from "./components/Footer";
// import ProductsPage from "./components/ProductsPage";


function App() {
  return (
    <Router>
      <Navb/>
      <Home/>
      <Footer/>
      {/* <ProductsPage/> */}
    </Router>
  );
}

export default App;

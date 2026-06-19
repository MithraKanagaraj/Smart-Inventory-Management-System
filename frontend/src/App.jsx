import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";
import SalesSummary from "./pages/SalesSummary";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/sales" element={<SalesSummary />} />
            <Route path="/" element={<Products />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

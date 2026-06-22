import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="app-navbar">
      <NavLink className="brand" to="/">
        <span className="brand-mark">IM</span>
        <span>
          <span className="brand-title">InventoryMS</span>
          <span className="brand-subtitle">Operations Dashboard</span>
        </span>
      </NavLink>

      <div className="nav-links">
            <NavLink className="nav-item" to="/dashboard">
              Dashboard
            </NavLink>

        <NavLink className="nav-item" to="/products">
          Products
        </NavLink>

            <NavLink className="nav-item" to="/categories">
              Categories
            </NavLink>

        <NavLink className="nav-item" to="/purchases">
          Purchases
        </NavLink>

        <NavLink className="nav-item" to="/sales">
          Sales Summary
        </NavLink>

        <NavLink className="nav-item" to="/inventory">
          Inventory
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

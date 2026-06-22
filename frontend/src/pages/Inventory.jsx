import { useMemo } from "react";
import sampleProducts from "../data/sampleProducts";

function Inventory() {
  const LOW_STOCK_THRESHOLD = 10;

  const lowStock = useMemo(
    () => sampleProducts.filter((p) => p.stock <= LOW_STOCK_THRESHOLD),
    [],
  );

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Inventory</h1>
          <p className="page-description">Track stock across locations.</p>
        </div>
      </header>

      <div className="layout-2col">
        <section className="panel" style={{ flex: 2, marginRight: 16 }}>
          <div className="panel-header">
            <div>
              <p className="eyebrow">Stock</p>
              <h2>Inventory Levels</h2>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table app-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {sampleProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.stock}</td>
                    <td>
                      <span className={`status-pill ${p.stock <= LOW_STOCK_THRESHOLD ? "danger" : "success"}`}>
                        {p.stock <= LOW_STOCK_THRESHOLD ? "Low stock" : "In stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside style={{ width: 320 }}>
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Alerts</p>
                <h2>Low Stock</h2>
              </div>
            </div>

            <div className="panel-body">
              {lowStock.length === 0 ? (
                <div>No low stock items.</div>
              ) : (
                <ul className="alert-list">
                  {lowStock.map((p) => (
                    <li key={p.id} className="alert-item danger">
                      <strong>{p.name}</strong>
                      <div>Stock: {p.stock}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Inventory;

import ProductForm from "../components/ProductForm";

const products = [
  { id: 1, name: "Laptop", price: 50000, stock: 20, status: "In stock" },
  { id: 2, name: "Mouse", price: 500, stock: 100, status: "In stock" },
];

function Products() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Products</h1>
          <p className="page-description">
            Maintain catalog pricing, stock levels, and availability from one
            workspace.
          </p>
        </div>
        <button className="btn btn-primary">Export List</button>
      </header>

      <div className="stats-grid">
        <article className="metric-card">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </article>
        <article className="metric-card">
          <span>Units In Stock</span>
          <strong>
            {products.reduce((total, product) => total + product.stock, 0)}
          </strong>
        </article>
        <article className="metric-card">
          <span>Inventory Value</span>
          <strong>
            INR{" "}
            {products
              .reduce(
                (total, product) => total + product.stock * product.price,
                0,
              )
              .toLocaleString("en-IN")}
          </strong>
        </article>
      </div>

      <ProductForm />

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2>Product List</h2>
          </div>
          <span className="status-pill success">Live</span>
        </div>

        <div className="table-responsive">
          <table className="table app-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id.toString().padStart(3, "0")}</td>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>INR {product.price.toLocaleString("en-IN")}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className="status-pill success">
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Products;

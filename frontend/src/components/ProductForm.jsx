import { useState } from "react";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product saved");
  };

  return (
    <section className="panel form-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2>Add Product</h2>
        </div>
        <span className="status-pill">Draft</span>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            className="form-control"
            placeholder="Laptop"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
          />
        </label>

        <label>
          Price
          <input
            type="number"
            className="form-control"
            placeholder="50000"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: e.target.value,
              })
            }
          />
        </label>

        <label>
          Opening stock
          <input
            type="number"
            className="form-control"
            placeholder="20"
            value={product.stock}
            onChange={(e) =>
              setProduct({
                ...product,
                stock: e.target.value,
              })
            }
          />
        </label>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save Product
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;

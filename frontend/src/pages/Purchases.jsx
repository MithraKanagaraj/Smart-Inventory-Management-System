import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const initialPurchase = {
  productId: "",
  quantity: "",
  unitCost: "",
  supplier: "",
  date: "",
};

function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function Purchases() {
  const [purchase, setPurchase] = useState(initialPurchase);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const selectedProductFromList = useMemo(
    () =>
      products.find((product) => product.id === Number(purchase.productId)) ||
      null,
    [products, purchase.productId],
  );

  const activeProduct = selectedProductFromList || selectedProduct;
  const currentStock = activeProduct?.quantity;

  const fetchProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
    return response.data;
  };

  const fetchPurchases = async () => {
    const response = await api.get("/purchases");
    setPurchases(response.data);
  };

  useEffect(() => {
    async function loadPurchasesPage() {
      try {
        setIsLoading(true);
        await Promise.all([fetchProducts(), fetchPurchases()]);
      } catch {
        setStatus({
          type: "error",
          message: "Unable to load purchases. Please confirm the API is running.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPurchasesPage();
  }, []);

  const validate = () => {
    const nextErrors = {};

    if (!purchase.productId) {
      nextErrors.productId = "Select a product.";
    }

    if (Number(purchase.quantity) <= 0) {
      nextErrors.quantity = "Quantity must be greater than 0.";
    }

    if (Number(purchase.unitCost) <= 0) {
      nextErrors.unitCost = "Cost must be greater than 0.";
    }

    if (!purchase.supplier.trim()) {
      nextErrors.supplier = "Supplier is required.";
    }

    if (!purchase.date) {
      nextErrors.date = "Purchase date is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setPurchase({
      ...purchase,
      [field]: e.target.value,
    });
    setErrors({
      ...errors,
      [field]: "",
    });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSaving(true);

      await api.post("/purchases", {
        productId: Number(purchase.productId),
        supplierName: purchase.supplier.trim(),
        quantity: Number(purchase.quantity),
        unitPrice: Number(purchase.unitCost),
        purchaseDate: purchase.date,
      });

      const productResponse = await api.get(`/products/${purchase.productId}`);
      setSelectedProduct(productResponse.data);

      await Promise.all([fetchProducts(), fetchPurchases()]);

      setPurchase(initialPurchase);
      setErrors({});
      setStatus({
        type: "success",
        message: "Purchase saved successfully. Stock has been refreshed.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data ||
          "Unable to save purchase. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Procurement</p>
          <h1>Purchases</h1>
          <p className="page-description">
            Record incoming stock, supplier information, and unit costs with a
            compact purchase workflow.
          </p>
        </div>
      </header>

      {status.message && (
        <div className={`notice ${status.type}`} role="status">
          {status.message}
        </div>
      )}

      <div className="content-grid">
        <section className="panel form-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">New entry</p>
              <h2>Record Purchase</h2>
            </div>
            <span className="status-pill">Pending</span>
          </div>

          <form className="form-grid two-column" onSubmit={handleSubmit}>
            <label>
              Product
              <select
                className="form-control"
                value={purchase.productId}
                onChange={handleChange("productId")}
                disabled={isLoading || isSaving}
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {errors.productId && (
                <span className="field-error">{errors.productId}</span>
              )}
            </label>

            <label>
              Quantity
              <input
                type="number"
                min="1"
                placeholder="25"
                className="form-control"
                value={purchase.quantity}
                onChange={handleChange("quantity")}
                disabled={isSaving}
              />
              {errors.quantity && (
                <span className="field-error">{errors.quantity}</span>
              )}
            </label>

            <label>
              Unit cost
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="1200"
                className="form-control"
                value={purchase.unitCost}
                onChange={handleChange("unitCost")}
                disabled={isSaving}
              />
              {errors.unitCost && (
                <span className="field-error">{errors.unitCost}</span>
              )}
            </label>

            <label>
              Supplier
              <input
                placeholder="Supplier name"
                className="form-control"
                value={purchase.supplier}
                onChange={handleChange("supplier")}
                disabled={isSaving}
              />
              {errors.supplier && (
                <span className="field-error">{errors.supplier}</span>
              )}
            </label>

            <label>
              Purchase date
              <input
                type="date"
                className="form-control"
                value={purchase.date}
                onChange={handleChange("date")}
                disabled={isSaving}
              />
              {errors.date && <span className="field-error">{errors.date}</span>}
            </label>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Purchase"}
              </button>
            </div>
          </form>
        </section>

        <aside className="stock-card">
          <span>Current Stock</span>
          <strong>{currentStock ?? "--"}</strong>
          <p>
            {activeProduct
              ? `${activeProduct.name} units available after latest refresh.`
              : "Select a product to preview the current stock level."}
          </p>
        </aside>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Purchase history</p>
            <h2>Purchases List</h2>
          </div>
          <span className="status-pill success">
            {purchases.length} Records
          </span>
        </div>

        <div className="table-responsive">
          <table className="table app-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Cost</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="empty-cell">
                    Loading purchases...
                  </td>
                </tr>
              ) : purchases.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-cell">
                    No purchases recorded yet.
                  </td>
                </tr>
              ) : (
                purchases.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.purchaseDate)}</td>
                    <td>
                      <strong>{item.productName}</strong>
                    </td>
                    <td>{item.quantity}</td>
                    <td>INR {Number(item.unitPrice).toLocaleString("en-IN")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Purchases;

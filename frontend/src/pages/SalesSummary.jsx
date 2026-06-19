import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const initialSale = {
  productId: "",
  quantity: "",
  unitPrice: "",
  customer: "",
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

function SalesSummary() {
  const [sale, setSale] = useState(initialSale);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === Number(sale.productId)) || null,
    [products, sale.productId],
  );

  const availableStock = selectedProduct?.quantity ?? null;
  const requestedQuantity = Number(sale.quantity);
  const exceedsStock =
    selectedProduct && sale.quantity !== "" && requestedQuantity > availableStock;

  const fetchProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  const fetchSales = async () => {
    const response = await api.get("/sales");
    setSales(response.data);
  };

  useEffect(() => {
    async function loadSalesPage() {
      try {
        setIsLoading(true);
        await Promise.all([fetchProducts(), fetchSales()]);
      } catch {
        setStatus({
          type: "error",
          message: "Unable to load sales. Please confirm the API is running.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadSalesPage();
  }, []);

  const validate = () => {
    const nextErrors = {};

    if (!sale.productId) {
      nextErrors.productId = "Select a product.";
    }

    if (requestedQuantity <= 0) {
      nextErrors.quantity = "Quantity must be greater than 0.";
    } else if (exceedsStock) {
      nextErrors.quantity = `Only ${availableStock} units are available.`;
    }

    if (Number(sale.unitPrice) <= 0) {
      nextErrors.unitPrice = "Price must be greater than 0.";
    }

    if (!sale.customer.trim()) {
      nextErrors.customer = "Customer is required.";
    }

    if (!sale.date) {
      nextErrors.date = "Sale date is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setSale({
      ...sale,
      [field]: e.target.value,
    });
    setErrors({
      ...errors,
      [field]: "",
    });
    setStatus({ type: "", message: "" });
  };

  const getErrorMessage = (error) => {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data?.title) {
      return data.title;
    }

    return "Unable to save sale. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSaving(true);

      await api.post("/sales", {
        productId: Number(sale.productId),
        quantity: requestedQuantity,
        unitPrice: Number(sale.unitPrice),
        customerName: sale.customer.trim(),
        saleDate: sale.date,
      });

      await Promise.all([fetchProducts(), fetchSales()]);

      setSale(initialSale);
      setErrors({});
      setStatus({
        type: "success",
        message: "Sale saved successfully. Stock has been updated.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Sales</p>
          <h1>Sales</h1>
          <p className="page-description">
            Record outgoing stock with product, quantity, unit price, and
            customer details.
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
              <h2>Record Sale</h2>
            </div>
            <span className="status-pill">Pending</span>
          </div>

          <form className="form-grid two-column" onSubmit={handleSubmit}>
            <label>
              Product
              <select
                className="form-control"
                value={sale.productId}
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
                placeholder="5"
                className="form-control"
                value={sale.quantity}
                onChange={handleChange("quantity")}
                disabled={isSaving}
              />
              <span className={exceedsStock ? "field-error" : "field-hint"}>
                {selectedProduct
                  ? `${availableStock} units available`
                  : "Select a product to view stock"}
              </span>
              {errors.quantity && (
                <span className="field-error">{errors.quantity}</span>
              )}
            </label>

            <label>
              Unit price
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="50000"
                className="form-control"
                value={sale.unitPrice}
                onChange={handleChange("unitPrice")}
                disabled={isSaving}
              />
              {errors.unitPrice && (
                <span className="field-error">{errors.unitPrice}</span>
              )}
            </label>

            <label>
              Customer
              <input
                placeholder="Customer name"
                className="form-control"
                value={sale.customer}
                onChange={handleChange("customer")}
                disabled={isSaving}
              />
              {errors.customer && (
                <span className="field-error">{errors.customer}</span>
              )}
            </label>

            <label>
              Sale date
              <input
                type="date"
                className="form-control"
                value={sale.date}
                onChange={handleChange("date")}
                disabled={isSaving}
              />
              {errors.date && <span className="field-error">{errors.date}</span>}
            </label>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSaving || exceedsStock}
              >
                {isSaving ? "Saving..." : "Save Sale"}
              </button>
            </div>
          </form>
        </section>

        <aside className="stock-card">
          <span>Available Stock</span>
          <strong>{availableStock ?? "--"}</strong>
          <p>
            {selectedProduct
              ? `${selectedProduct.name} units currently available.`
              : "Select a product before recording a sale."}
          </p>
        </aside>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Sales history</p>
            <h2>Sales List</h2>
          </div>
          <span className="status-pill success">{sales.length} Records</span>
        </div>

        <div className="table-responsive">
          <table className="table app-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Customer</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="empty-cell">
                    Loading sales...
                  </td>
                </tr>
              ) : sales.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-cell">
                    No sales recorded yet.
                  </td>
                </tr>
              ) : (
                sales.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.saleDate)}</td>
                    <td>
                      <strong>{item.productName}</strong>
                    </td>
                    <td>{item.quantity}</td>
                    <td>INR {Number(item.unitPrice).toLocaleString("en-IN")}</td>
                    <td>{item.customerName}</td>
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

export default SalesSummary;

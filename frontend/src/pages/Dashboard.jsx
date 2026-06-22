import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import sampleProducts from "../data/sampleProducts";

function Dashboard() {
  const LOW_STOCK_THRESHOLD = 10;
  const [products, setProducts] = useState(() => sampleProducts);
  const [now, setNow] = useState(Date.now());

  // Derived metrics
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const lowStockCount = products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD)
      .length;
    const unitsInStock = products.reduce((s, p) => s + p.stock, 0);
    const inventoryValue = products.reduce((s, p) => s + p.stock * p.price, 0);

    // For demo: generate today's sales/purchases as small random values
    const todaysSales = Math.floor(Math.random() * 50);
    const todaysPurchases = Math.floor(Math.random() * 20);

    return {
      totalProducts,
      lowStockCount,
      unitsInStock,
      inventoryValue,
      todaysSales,
      todaysPurchases,
    };
  }, [products, now]);

  // Prepare chart data: top 5 products by stock
  const chartData = useMemo(() => {
    return [...products]
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 5)
      .map((p) => ({ name: p.name, stock: p.stock }));
  }, [products]);

  // Auto-refresh every 30s: simulate a refresh by nudging `now` and randomly adjusting stock slightly
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
      setProducts((prev) =>
        prev.map((p) => {
          // random small fluctuation for demo purposes
          const delta = Math.floor(Math.random() * 3) - 1; // -1..1
          const nextStock = Math.max(0, p.stock + delta);
          return { ...p, stock: nextStock, status: nextStock <= LOW_STOCK_THRESHOLD ? "Low stock" : "In stock" };
        }),
      );
    }, 30000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Overview</h1>
          <p className="page-description">Quick stats and recent activity.</p>
        </div>
      </header>

      <div className="stats-grid">
        <article className="metric-card">
          <span>Total Products</span>
          <strong>{metrics.totalProducts}</strong>
        </article>

        <article className="metric-card">
          <span>Low Stock Count</span>
          <strong>{metrics.lowStockCount}</strong>
        </article>

        <article className="metric-card">
          <span>Today's Sales</span>
          <strong>{metrics.todaysSales}</strong>
        </article>

        <article className="metric-card">
          <span>Today's Purchases</span>
          <strong>{metrics.todaysPurchases}</strong>
        </article>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">Inventory</p>
            <h2>Top 5 Products by Stock</h2>
          </div>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

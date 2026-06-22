function Categories() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Categories</h1>
          <p className="page-description">Manage product categories.</p>
        </div>
        <button className="btn">New Category</button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Category List</h2>
          </div>
        </div>

        <div className="panel-body">No categories yet.</div>
      </section>
    </div>
  );
}

export default Categories;

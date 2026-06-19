using InventoryAPI.Data;
using InventoryAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(InMemoryInventoryStore.Sales);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var sale = InMemoryInventoryStore.Sales.FirstOrDefault(s => s.Id == id);

        if (sale == null)
            return NotFound();

        return Ok(sale);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Sale sale)
    {
        if (sale.Quantity <= 0)
            return BadRequest("Quantity must be greater than 0");

        if (sale.UnitPrice <= 0)
            return BadRequest("Price must be greater than 0");

        if (string.IsNullOrWhiteSpace(sale.CustomerName))
            return BadRequest("Customer is required");

        var product = InMemoryInventoryStore.Products
            .FirstOrDefault(p => p.Id == sale.ProductId);

        if (product == null)
            return BadRequest("Product not found");

        if (sale.Quantity > product.Quantity)
            return BadRequest($"Insufficient stock. Available stock is {product.Quantity}.");

        sale.Id = InMemoryInventoryStore.Sales.Count == 0
            ? 1
            : InMemoryInventoryStore.Sales.Max(s => s.Id) + 1;
        sale.ProductName = product.Name;

        InMemoryInventoryStore.Sales.Add(sale);
        product.Quantity -= sale.Quantity;

        return CreatedAtAction(nameof(GetById), new { id = sale.Id }, sale);
    }
}

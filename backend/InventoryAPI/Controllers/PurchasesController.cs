using InventoryAPI.Data;
using InventoryAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchasesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(InMemoryInventoryStore.Purchases);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var purchase = InMemoryInventoryStore.Purchases.FirstOrDefault(p => p.Id == id);

        if (purchase == null)
            return NotFound();

        return Ok(purchase);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Purchase purchase)
    {
        if (purchase.Quantity <= 0)
            return BadRequest("Quantity must be greater than 0");

        if (purchase.UnitPrice <= 0)
            return BadRequest("Cost must be greater than 0");

        var product = InMemoryInventoryStore.Products
            .FirstOrDefault(p => p.Id == purchase.ProductId);

        if (product == null)
            return BadRequest("Product not found");

        purchase.Id = InMemoryInventoryStore.Purchases.Count == 0
            ? 1
            : InMemoryInventoryStore.Purchases.Max(p => p.Id) + 1;
        purchase.ProductName = product.Name;

        InMemoryInventoryStore.Purchases.Add(purchase);
        product.Quantity += purchase.Quantity;

        return CreatedAtAction(nameof(GetById), new { id = purchase.Id }, purchase);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Purchase updatedPurchase)
    {
        var purchase = InMemoryInventoryStore.Purchases.FirstOrDefault(p => p.Id == id);

        if (purchase == null)
            return NotFound();

        purchase.SupplierName = updatedPurchase.SupplierName;
        purchase.ProductId = updatedPurchase.ProductId;
        purchase.ProductName = updatedPurchase.ProductName;
        purchase.Quantity = updatedPurchase.Quantity;
        purchase.UnitPrice = updatedPurchase.UnitPrice;
        purchase.PurchaseDate = updatedPurchase.PurchaseDate;

        return Ok(purchase);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var purchase = InMemoryInventoryStore.Purchases.FirstOrDefault(p => p.Id == id);

        if (purchase == null)
            return NotFound();

        InMemoryInventoryStore.Purchases.Remove(purchase);

        return NoContent();
    }
}

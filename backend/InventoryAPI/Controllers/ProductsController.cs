using InventoryAPI.Data;
using InventoryAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventoryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(InMemoryInventoryStore.Products);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = InMemoryInventoryStore.Products.FirstOrDefault(p => p.Id == id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Product product)
    {
        product.Id = InMemoryInventoryStore.Products.Count == 0
            ? 1
            : InMemoryInventoryStore.Products.Max(p => p.Id) + 1;

        InMemoryInventoryStore.Products.Add(product);

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Product updatedProduct)
    {
        var product = InMemoryInventoryStore.Products.FirstOrDefault(p => p.Id == id);

        if (product == null)
            return NotFound();

        product.Name = updatedProduct.Name;
        product.Category = updatedProduct.Category;
        product.Price = updatedProduct.Price;
        product.Quantity = updatedProduct.Quantity;

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = InMemoryInventoryStore.Products.FirstOrDefault(p => p.Id == id);

        if (product == null)
            return NotFound();

        InMemoryInventoryStore.Products.Remove(product);

        return NoContent();
    }
}

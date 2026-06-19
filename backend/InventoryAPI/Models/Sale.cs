namespace InventoryAPI.Models;

public class Sale
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public DateTime SaleDate { get; set; }
}

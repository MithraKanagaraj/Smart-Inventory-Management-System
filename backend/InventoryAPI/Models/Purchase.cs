namespace InventoryAPI.Models;

public class Purchase
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string SupplierName { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public DateTime PurchaseDate { get; set; }
}

// namespace InventoryAPI.Models;

// public class Purchase
// {
//     public int PurchaseId { get; set; }

//     public string Vendor { get; set; } = string.Empty;

//     public string ItemName { get; set; } = string.Empty;

//     public int UnitsBought { get; set; }

//     public decimal CostPerUnit { get; set; }

//     //public DateTime DateOfPurchase { get; set; }
// }

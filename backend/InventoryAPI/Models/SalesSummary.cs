// namespace InventoryAPI.Models;

// public class SalesSummary
// {
//     public int Id { get; set; }
//     public string ProductName { get; set; } = string.Empty;
//     public int QuantitySold { get; set; }
//     public decimal TotalAmount { get; set; }
//     public DateTime SaleDate { get; set; }
// }
namespace InventoryAPI.Models;

public class SalesReport
{
    public int ReportId { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public int UnitsSold { get; set; }
    public decimal Revenue { get; set; }
    public DateTime ReportDate { get; set; }
}
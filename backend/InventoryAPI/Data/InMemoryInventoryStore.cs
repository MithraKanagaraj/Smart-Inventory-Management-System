using InventoryAPI.Models;

namespace InventoryAPI.Data;

public static class InMemoryInventoryStore
{
    public static List<Product> Products { get; } =
    [
        new Product
        {
            Id = 1,
            Name = "Laptop",
            Category = "Electronics",
            Price = 50000,
            Quantity = 20
        },
        new Product
        {
            Id = 2,
            Name = "Mouse",
            Category = "Accessories",
            Price = 500,
            Quantity = 100
        },
        new Product
        {
            Id = 3,
            Name = "Keyboard",
            Category = "Accessories",
            Price = 1200,
            Quantity = 45
        }
    ];

    public static List<Purchase> Purchases { get; } = [];

    public static List<Sale> Sales { get; } = [];
}

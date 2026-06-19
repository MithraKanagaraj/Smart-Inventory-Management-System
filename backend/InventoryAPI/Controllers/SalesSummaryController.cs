// using Microsoft.AspNetCore.Mvc;
// using InventoryAPI.Models;

// namespace InventoryAPI.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// public class SalesSummaryController : ControllerBase
// {
//     private static List<SalesSummary> sales = new();

//     // GET: api/SalesSummary
//     [HttpGet]
//     public ActionResult<IEnumerable<SalesSummary>> GetAll()
//     {
//         return Ok(sales);
//     }

//     // GET: api/SalesSummary/1
//     [HttpGet("{id}")]
//     public ActionResult<SalesSummary> GetById(int id)
//     {
//         var sale = sales.FirstOrDefault(s => s.Id == id);

//         if (sale == null)
//             return NotFound();

//         return Ok(sale);
//     }

//     // POST: api/SalesSummary
//     [HttpPost]
//     public ActionResult<SalesSummary> Create(SalesSummary sale)
//     {
//         sales.Add(sale);

//         return CreatedAtAction(
//             nameof(GetById),
//             new { id = sale.Id },
//             sale
//         );
//     }

//     // PUT: api/SalesSummary/1
//     [HttpPut("{id}")]
//     public IActionResult Update(int id, SalesSummary updatedSale)
//     {
//         var sale = sales.FirstOrDefault(s => s.Id == id);

//         if (sale == null)
//             return NotFound();

//         sale.ProductName = updatedSale.ProductName;
//         sale.QuantitySold = updatedSale.QuantitySold;
//         sale.TotalAmount = updatedSale.TotalAmount;
//         sale.SaleDate = updatedSale.SaleDate;

//         return NoContent();
//     }

//     // DELETE: api/SalesSummary/1
//     [HttpDelete("{id}")]
//     public IActionResult Delete(int id)
//     {
//         var sale = sales.FirstOrDefault(s => s.Id == id);

//         if (sale == null)
//             return NotFound();

//         sales.Remove(sale);

//         return NoContent();
//     }
// }
using Microsoft.AspNetCore.Mvc;
using InventoryAPI.Models;

namespace InventoryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesReportController : ControllerBase
{
    private static List<SalesReport> reports = new();

    [HttpGet]
    public ActionResult<IEnumerable<SalesReport>> GetReports()
    {
        return Ok(reports);
    }

    [HttpGet("{id}")]
    public ActionResult<SalesReport> GetReport(int id)
    {
        var report = reports.FirstOrDefault(r => r.ReportId == id);

        if (report == null)
            return NotFound();

        return Ok(report);
    }

    [HttpPost]
    public ActionResult<SalesReport> AddReport(SalesReport report)
    {
        reports.Add(report);

        return CreatedAtAction(
            nameof(GetReport),
            new { id = report.ReportId },
            report
        );
    }

    [HttpPut("{id}")]
    public IActionResult EditReport(int id, SalesReport updatedReport)
    {
        var report = reports.FirstOrDefault(r => r.ReportId == id);

        if (report == null)
            return NotFound();

        report.ItemName = updatedReport.ItemName;
        report.UnitsSold = updatedReport.UnitsSold;
        report.Revenue = updatedReport.Revenue;
        report.ReportDate = updatedReport.ReportDate;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveReport(int id)
    {
        var report = reports.FirstOrDefault(r => r.ReportId == id);

        if (report == null)
            return NotFound();

        reports.Remove(report);

        return NoContent();
    }
}
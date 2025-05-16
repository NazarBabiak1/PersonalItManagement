using Microsoft.AspNetCore.Mvc;
using PersonalITManagement.Data.Context;
using PersonalItManagement.Models;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/orders
    [HttpGet]
    public IActionResult GetOrders()
    {
        var orders = _context.Orders
    .Select(o => new
    {
        o.Id,
        o.Name,
        o.Address,
        o.TotalPrice,
        o.Discount,
        o.PaidAmount,
        Employees = o.Employees.Select(e => new { e.Id, e.User.UserName, e.Percentage }),
        Equipments = o.Equipments.Select(e => new { e.Id, e.Name, e.Count, e.Price }),
        Materials = o.Materials.Select(m => new { m.Id, m.Name, m.Count, m.Price }),
        Works = o.Works.Select(w => new { w.Id, w.Name, w.Cost })
    })
    .AsEnumerable()  // перевести у пам'ять (LINQ to Objects)
    .Select(o => new
    {
        o.Id,
        o.Name,
        o.Address,
        o.TotalPrice,
        o.Discount,
        o.PaidAmount,
        RemainingAmount = o.TotalPrice - o.Discount - o.PaidAmount,  
        o.Employees,
        o.Equipments,
        o.Materials,
        o.Works
    })
    .ToList();


        return Ok(orders);
    }

    // POST: api/orders
    [HttpPost]
    public IActionResult CreateOrder([FromBody] Order order)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.Orders.Add(order);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
    }

    // PUT: api/orders/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, [FromBody] Order updatedOrder)
    {
        var order = _context.Orders.Find(id);
        if (order == null)
            return NotFound();

        order.Name = updatedOrder.Name;
        order.Address = updatedOrder.Address;
        order.TotalPrice = updatedOrder.TotalPrice;
        order.Discount = updatedOrder.Discount;
        order.PaidAmount = updatedOrder.PaidAmount;
        order.OrderStatusId = updatedOrder.OrderStatusId;
        order.BoardId = updatedOrder.BoardId;  // Оновлюємо BoardId

        _context.SaveChanges();

        return NoContent();
    }

    // DELETE: api/orders/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id)
    {
        var order = _context.Orders.Find(id);
        if (order == null)
            return NotFound();

        _context.Orders.Remove(order);
        _context.SaveChanges();

        return NoContent();
    }
}

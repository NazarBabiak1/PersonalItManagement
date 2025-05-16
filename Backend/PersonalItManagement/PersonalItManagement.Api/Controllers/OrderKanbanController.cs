using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data;
using PersonalItManagement.Models;
using PersonalITManagement.Data.Context;

namespace PersonalItManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.Status)
                .Include(o => o.KanbanBoard)
                .Include(o => o.OrderComments)
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .Include(o => o.Works)
                .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Status)
                .Include(o => o.KanbanBoard)
                .Include(o => o.OrderComments)
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .Include(o => o.Works)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            return order;
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            order.CreatedAt = DateTime.UtcNow;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            if (id != order.Id)
                return BadRequest();

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Orders.Any(e => e.Id == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Orders/board/3 — отримати всі ордери на конкретній дошці
        [HttpGet("board/{boardId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByBoard(int boardId)
        {
            return await _context.Orders
                .Where(o => o.BoardId == boardId)
                .Include(o => o.Status)
                .Include(o => o.OrderComments)
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .Include(o => o.Works)
                .ToListAsync();
        }
    }
}

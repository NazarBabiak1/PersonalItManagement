using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data;
using PersonalItManagement.Models;
using PersonalITManagement.Data.Context;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

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
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Status)
                .Include(o => o.KanbanBoard)
                .Include(o => o.OrderComments)
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .ToListAsync();

            var orderDTOs = orders.Select(o => MapToOrderDTO(o)).ToList();
            return Ok(orderDTOs);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Status)
                .Include(o => o.KanbanBoard)
                .Include(o => o.OrderComments)
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            return Ok(MapToOrderDTO(order));
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] CreateOrderDTO createOrderDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = new Order
            {
                Name = createOrderDTO.Name,
                Address = createOrderDTO.Address,
                TotalPrice = createOrderDTO.TotalPrice,
                Discount = createOrderDTO.Discount,
                PaidAmount = createOrderDTO.PaidAmount,
                CreatedAt = DateTime.UtcNow,
                BoardId = createOrderDTO.Id // Припускаємо, що Id у DTO відповідає BoardId
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var orderDTO = MapToOrderDTO(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, orderDTO);
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDTO orderDTO)
        {
            if (id != orderDTO.Id)
                return BadRequest("Order ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingOrder = await _context.Orders
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (existingOrder == null)
                return NotFound();

            // Оновлюємо основні поля
            existingOrder.Name = orderDTO.Name;
            existingOrder.Address = orderDTO.Address;
            existingOrder.TotalPrice = orderDTO.TotalPrice;
            existingOrder.Discount = orderDTO.Discount;
            existingOrder.PaidAmount = orderDTO.PaidAmount;


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

        // GET: api/Orders/board/3
        [HttpGet("board/{boardId}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByBoard(int boardId)
        {
            var orders = await _context.Orders
                .Where(o => o.BoardId == boardId)
                .Include(o => o.Status)
                .Include(o => o.OrderComments)
                .Include(o => o.Employees)
                .Include(o => o.Equipments)
                .Include(o => o.Materials)
                .ToListAsync();

            var orderDTOs = orders.Select(o => MapToOrderDTO(o)).ToList();
            return Ok(orderDTOs);
        }

        // Метод для мапінгу Order на OrderDTO
        private OrderDTO MapToOrderDTO(Order order)
        {
            return new OrderDTO
            {
                Id = order.Id,
                Name = order.Name,
                Address = order.Address,
                TotalPrice = order.TotalPrice,
                Discount = order.Discount,
                PaidAmount = order.PaidAmount

            };
        }
    }
}
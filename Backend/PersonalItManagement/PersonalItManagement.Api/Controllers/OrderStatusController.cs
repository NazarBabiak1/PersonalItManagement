using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Models;
using PersonalITManagement.Data.Context;

namespace PersonalItManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderStatusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderStatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/orderstatus/board/5
        [HttpGet("board/{boardId}")]
        public async Task<ActionResult<IEnumerable<OrderStatusDTO>>> GetStatusesByBoard(int boardId)
        {
            var statuses = await _context.OrderStatuses
                .Where(s => s.KanbanBoardId == boardId)
                .OrderBy(s => s.Position)
                .Select(s => new OrderStatusDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Position = s.Position,
                    BoardId = s.KanbanBoardId
                })
                .ToListAsync();

            return Ok(statuses);
        }

        // GET: api/orderstatus/3
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderStatusDTO>> GetById(int id)
        {
            var status = await _context.OrderStatuses.FindAsync(id);

            if (status == null)
                return NotFound(new { message = "Status not found." });

            var dto = new OrderStatusDTO
            {
                Id = status.Id,
                Name = status.Name,
                Position = status.Position,
                BoardId = status.KanbanBoardId
            };

            return Ok(dto);
        }

        // POST: api/orderstatus
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderStatusDTO dto)
        {
            var boardExists = await _context.KanbanBoards.AnyAsync(b => b.Id == dto.BoardId);
            if (!boardExists)
                return NotFound(new { message = "Kanban board not found." });

            var status = new OrderStatus
            {
                Name = dto.Name,
                Position = dto.Position,
                KanbanBoardId = dto.BoardId
            };

            _context.OrderStatuses.Add(status);
            await _context.SaveChangesAsync();

            dto.Id = status.Id; // Повертаємо створений ID

            return Ok(new { message = "Status created successfully.", status = dto });
        }

        // PUT: api/orderstatus/3
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OrderStatusDTO dto)
        {
            var status = await _context.OrderStatuses.FindAsync(id);
            if (status == null)
                return NotFound(new { message = "Status not found." });

            status.Name = dto.Name;
            status.Position = dto.Position;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Status updated successfully." });
        }

        // DELETE: api/orderstatus/3
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var status = await _context.OrderStatuses.FindAsync(id);
            if (status == null)
                return NotFound(new { message = "Status not found." });

            _context.OrderStatuses.Remove(status);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Status deleted successfully." });
        }
    }
}

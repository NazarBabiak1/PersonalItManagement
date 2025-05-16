using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data.Models;
using PersonalITManagement.Data.Context;
using System.Security.Claims;

namespace PersonalItManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderCommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public OrderCommentsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/OrderComments/order/5
        [HttpGet("order/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderCommentDTO>>> GetCommentsForOrder(int orderId)
        {
            var comments = await _context.OrderComments
                .Where(c => c.OrderId == orderId)
                .Include(c => c.User)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new OrderCommentDTO
                {
                    Id = c.Id,
                    CommentText = c.CommentText,
                    CreatedAt = c.CreatedAt,
                    UserName = c.User.UserName ?? "Unknown"
                })
                .ToListAsync();

            return Ok(comments);
        }

        // POST: api/OrderComments
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OrderCommentDTO>> AddComment(CreateOrderCommentDTO commentDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var comment = new OrderComment
            {
                OrderId = commentDto.OrderId,
                CommentText = commentDto.CommentText,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.OrderComments.Add(comment);
            await _context.SaveChangesAsync();

            var user = await _userManager.FindByIdAsync(userId);

            var resultDto = new OrderCommentDTO
            {
                Id = comment.Id,
                CommentText = comment.CommentText,
                CreatedAt = comment.CreatedAt,
                UserName = user?.UserName ?? "Unknown"
            };

            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, resultDto);
        }

        // GET: api/OrderComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderCommentDTO>> GetComment(int id)
        {
            var comment = await _context.OrderComments
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (comment == null)
                return NotFound();

            var commentDto = new OrderCommentDTO
            {
                Id = comment.Id,
                CommentText = comment.CommentText,
                CreatedAt = comment.CreatedAt,
                UserName = comment.User?.UserName ?? "Unknown"
            };

            return Ok(commentDto);
        }

        // DELETE: api/OrderComments/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.OrderComments.FindAsync(id);
            if (comment == null)
                return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (comment.UserId != userId)
                return Forbid();

            _context.OrderComments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

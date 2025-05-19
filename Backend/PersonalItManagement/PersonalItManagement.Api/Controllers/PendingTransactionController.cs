using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data.DTOs;
using PersonalItManagement.Data.Models;
using PersonalITManagement.Data.Context;

namespace PersonalItManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PendingTransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PendingTransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PendingTransactionDTO dto)
        {
            byte[]? photoBytes = null;

            if (!string.IsNullOrEmpty(dto.PhotoBase64))
            {
                try
                {
                    photoBytes = Convert.FromBase64String(dto.PhotoBase64);
                }
                catch
                {
                    return BadRequest(new { message = "Invalid Base64 photo data." });
                }
            }

            var transaction = new PendingTransaction
            {
                UserId = dto.UserId,
                OrderId = dto.OrderId,
                Amount = dto.Amount,
                Photo = photoBytes
            };

            _context.PendingTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Pending transaction created successfully." });
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _context.PendingTransactions
                .Include(t => t.User)
                .Include(t => t.Order)
                .ToListAsync();

            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var transaction = await _context.PendingTransactions
                .Include(t => t.User)
                .Include(t => t.Order)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
                return NotFound(new { message = "Transaction not found." });

            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var transaction = await _context.PendingTransactions.FindAsync(id);
            if (transaction == null)
                return NotFound(new { message = "Transaction not found." });

            _context.PendingTransactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Transaction deleted successfully." });
        }

        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetByUserId(string userId)
        {
            var transactions = await _context.PendingTransactions
                .Include(t => t.User)
                .Include(t => t.Order)
                .Where(t => t.UserId == userId)
                .ToListAsync();

            if (transactions == null || transactions.Count == 0)
                return NotFound(new { message = "No transactions found for this user." });

            return Ok(transactions);
        }

        [HttpGet("by-order/{orderId}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var transactions = await _context.PendingTransactions
                .Include(t => t.User)
                .Include(t => t.Order)
                .Where(t => t.OrderId == orderId)
                .ToListAsync();

            if (transactions == null || transactions.Count == 0)
                return NotFound(new { message = "No transactions found for this order." });

            return Ok(transactions);
        }
    }
}

using Microsoft.AspNetCore.Identity;
using PersonalItManagement.Models;

namespace PersonalItManagement.Data.Models
{
    public class PendingTransaction
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public decimal Amount { get; set; }
        public byte[] Photo { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
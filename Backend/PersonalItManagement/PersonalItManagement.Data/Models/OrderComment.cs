using Microsoft.AspNetCore.Identity;
using PersonalItManagement.Models;

namespace PersonalItManagement.Data.Models
{
    public class OrderComment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
        public string CommentText { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

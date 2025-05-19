using Microsoft.AspNetCore.Identity;
using PersonalItManagement.Models;

namespace PersonalItManagement.Data.Models
{
    public class KanbanBoard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedByUserId { get; set; }
        public IdentityUser CreatedByUser { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<OrderStatus> OrderStatuses { get; set; } = new List<OrderStatus>();

    }
}

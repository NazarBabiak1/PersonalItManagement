using PersonalItManagement.Data.Models;

namespace PersonalItManagement.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal PaidAmount { get; set; }
        public int OrderStatusId { get; set; }
        public OrderStatus Status { get; set; }
        public int Priority { get; set; }
        public int BoardId { get; set; }
        public KanbanBoard KanbanBoard { get; set; }
        public ICollection<OrderComment> OrderComments { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public ICollection<Equipment> Equipments { get; set; }
        public ICollection<Material> Materials { get; set; }
    }
}

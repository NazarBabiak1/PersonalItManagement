using PersonalItManagement.Data.Models;

namespace PersonalItManagement.Models
{
    public class OrderStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Position { get; set; }
        public int KanbanBoardId { get; set; }
        public KanbanBoard KanbanBoard { get; set; }
    }
}

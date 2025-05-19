
using PersonalItManagement.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

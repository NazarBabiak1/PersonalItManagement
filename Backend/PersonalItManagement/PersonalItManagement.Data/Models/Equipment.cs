using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        public string Name { get; set; } // Назва обладнання
        public int Count { get; set; } // Кількість
        public decimal Price { get; set; } // Ціна за одиницю
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }
}
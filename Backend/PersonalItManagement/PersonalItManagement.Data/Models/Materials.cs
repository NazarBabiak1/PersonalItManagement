using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Data.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string Name { get; set; } // Назва матеріалу
        public int Count { get; set; } // Кількість
        public decimal Price { get; set; } // Ціна за одиницю
    }
}

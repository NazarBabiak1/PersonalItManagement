using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Data.Models
{
    public class Work
    {
        public int Id { get; set; }
        public string Name { get; set; } // Назва роботи
        public decimal Cost { get; set; } // Вартість роботи
    }
}

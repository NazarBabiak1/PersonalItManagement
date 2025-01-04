using PersonalItManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Data.Models
{
    public class ProfitDistribution
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string Role { get; set; } // Роль (PiT, Власник, Інженер тощо)
        public decimal Amount { get; set; } // Сума прибутку
    }
}
}

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public int Percentage { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int Price { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public int OrderStatusId { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public ICollection<Equipment> Equipments { get; set; }
    }
}
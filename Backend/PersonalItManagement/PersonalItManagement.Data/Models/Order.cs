using PersonalItManagement.Data.Models;
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
        public string Name { get; set; } // Назва замовлення
        public string Address { get; set; } // Адреса виконання
        public decimal TotalPrice { get; set; } // Загальна вартість
        public decimal Discount { get; set; } // Знижка
        public decimal PaidAmount { get; set; } // Сума, оплачена замовником
        public decimal RemainingAmount { get; set; } // Залишок до оплати
        public int OrderStatusId { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<Employee> Employees { get; set; } // Учасники
        public ICollection<Equipment> Equipments { get; set; } // Обладнання
        public ICollection<Material> Materials { get; set; } // Матеріали
        public ICollection<Work> Works { get; set; } // Роботи
    }
}
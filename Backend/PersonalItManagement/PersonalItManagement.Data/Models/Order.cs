using System;
using System.Collections.Generic;
using PersonalItManagement.Data.Models;

namespace PersonalItManagement.Models
{
    public class Order
    {
        public int Id { get; set; }

        // Назва картки (таску)
        public string Name { get; set; }

        // Опис/Адреса
        public string Address { get; set; }

        // Дати для Kanban
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }

        // Фінансові дані
        public decimal TotalPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal PaidAmount { get; set; }

        // Статус (колонка Kanban)
        public int OrderStatusId { get; set; }
        public OrderStatus Status { get; set; }

        // Пріоритет
        public int Priority { get; set; }

        // Зв'язок з KanbanBoard
        public int BoardId { get; set; }
        public KanbanBoard KanbanBoard { get; set; }
        public ICollection<OrderComment> OrderComments { get; set; }

        // Виконавці (учасники таску)
        public ICollection<Employee> Employees { get; set; }

        // Ресурси
        public ICollection<Equipment> Equipments { get; set; }
        public ICollection<Material> Materials { get; set; }
        public ICollection<Work> Works { get; set; }
    }
}

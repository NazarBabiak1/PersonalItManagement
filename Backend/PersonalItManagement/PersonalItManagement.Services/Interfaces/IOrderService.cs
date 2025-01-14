using PersonalItManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Services.Interfaces
{
    public interface IOrderService
    {
        Task<List<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int id);
    }
}

using PersonalITManagement.Data.Context;
using PersonalItManagement.Models;
using PersonalItManagement.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PersonalItManagement.Services.Services;

public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _context;

    public OrderService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Order>> GetOrdersAsync()
    {
        return await _context.Orders
            .Include(o => o.Employees)
            .Include(o => o.Equipments)
            .Include(o => o.Materials)
            .Include(o => o.Works)
            .ToListAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.Employees)
            .Include(o => o.Equipments)
            .Include(o => o.Materials)
            .Include(o => o.Works)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task AddOrderAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateOrderAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteOrderAsync(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order != null)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}

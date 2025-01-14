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

public class EquipmentService : IEquipmentService
{
    private readonly ApplicationDbContext _context;

    public EquipmentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Equipment>> GetEquipmentsAsync()
    {
        return await _context.Equipments.ToListAsync();
    }

    public async Task<Equipment> GetEquipmentByIdAsync(int id)
    {
        return await _context.Equipments.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task AddEquipmentAsync(Equipment equipment)
    {
        _context.Equipments.Add(equipment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateEquipmentAsync(Equipment equipment)
    {
        _context.Equipments.Update(equipment);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteEquipmentAsync(int id)
    {
        var equipment = await _context.Equipments.FindAsync(id);
        if (equipment != null)
        {
            _context.Equipments.Remove(equipment);
            await _context.SaveChangesAsync();
        }
    }
}

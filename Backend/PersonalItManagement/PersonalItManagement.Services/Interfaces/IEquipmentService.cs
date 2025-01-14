using PersonalItManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Services.Interfaces
{
    public interface IEquipmentService
    {
        Task<List<Equipment>> GetEquipmentsAsync();
        Task<Equipment> GetEquipmentByIdAsync(int id);
        Task AddEquipmentAsync(Equipment equipment);
        Task UpdateEquipmentAsync(Equipment equipment);
        Task DeleteEquipmentAsync(int id);
    }
}

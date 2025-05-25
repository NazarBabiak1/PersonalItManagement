using Microsoft.AspNetCore.Mvc;
using PersonalITManagement.Data.Context;
using PersonalItManagement.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PersonalItManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EquipmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/equipments
        [HttpGet]
        public ActionResult<IEnumerable<EquipmentDTO>> GetEquipments()
        {
            var equipments = _context.Equipments
                .Select(e => new EquipmentDTO
                {
                    Id = e.Id,
                    Name = e.Name,
                    Count = e.Count,
                    Price = e.Price,
                    OrderId = e.OrderId
                })
                .ToList();

            return Ok(equipments);
        }

        [HttpGet("byOrder")]
        public async Task<ActionResult<IEnumerable<EquipmentDTO>>> GetEquipmentsByOrderId([FromQuery] int orderId)
        {
            var equipments = await _context.Equipments
                .Where(e => e.OrderId == orderId)
                .Select(e => new EquipmentDTO
                {
                    Id = e.Id,
                    Name = e.Name,
                    Count = e.Count,
                    Price = e.Price,
                    OrderId = e.OrderId
                })
                .ToListAsync();

            return Ok(equipments);
        }

        // POST: api/equipments
        [HttpPost]
        public ActionResult<EquipmentDTO> CreateEquipment([FromBody] EquipmentDTO equipmentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var equipment = new Equipment
            {
                Name = equipmentDto.Name,
                Count = equipmentDto.Count,
                Price = equipmentDto.Price,
                OrderId = equipmentDto.OrderId
            };

            _context.Equipments.Add(equipment);
            _context.SaveChanges();

            equipmentDto.Id = equipment.Id; // Заповнюємо Id після збереження

            return CreatedAtAction(nameof(GetEquipments), new { id = equipment.Id }, equipmentDto);
        }

        // DELETE: api/equipments/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteEquipment(int id)
        {
            var equipment = _context.Equipments.Find(id);
            if (equipment == null)
                return NotFound();

            _context.Equipments.Remove(equipment);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

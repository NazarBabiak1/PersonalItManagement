using Microsoft.AspNetCore.Mvc;
using PersonalITManagement.Data.Context;
using PersonalItManagement.Models;

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
        public IActionResult GetEquipments()
        {
            var equipments = _context.Equipments
                .Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Count,
                    e.Price
                }).ToList();

            return Ok(equipments);
        }

        // POST: api/equipments
        [HttpPost]
        public IActionResult CreateEquipment([FromBody] Equipment equipment)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Equipments.Add(equipment);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEquipments), new { id = equipment.Id }, equipment);
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

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalItManagement.Data.Models;
using PersonalItManagement.Models;
using PersonalITManagement.Data.Context;
using System.Collections.Generic;
using System.Linq;

namespace PersonalItManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MaterialsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/materials
        [HttpGet]
        public ActionResult<IEnumerable<MaterialDTO>> GetMaterials()
        {
            var materials = _context.Materials
                .Select(m => new MaterialDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    Count = m.Count,
                    Price = m.Price,
                    OrderId = m.OrderId
                })
                .ToList();

            return Ok(materials);
        }

        [HttpGet("byOrder")]
        public async Task<ActionResult<IEnumerable<MaterialDTO>>> GetMaterialsByOrderId([FromQuery] int orderId)
        {
            var materials = await _context.Materials
                .Where(m => m.OrderId == orderId)
                .Select(m => new MaterialDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    Count = m.Count,
                    Price = m.Price,
                    OrderId = m.OrderId
                })
                .ToListAsync();

            return Ok(materials);
        }

        // POST: api/materials
        [HttpPost]
        public ActionResult<MaterialDTO> CreateMaterial([FromBody] MaterialDTO materialDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var material = new Material
            {
                Name = materialDto.Name,
                Count = materialDto.Count,
                Price = materialDto.Price,
                OrderId = materialDto.OrderId
            };

            _context.Materials.Add(material);
            _context.SaveChanges();

            materialDto.Id = material.Id; // Повертаємо новий ідентифікатор

            return CreatedAtAction(nameof(GetMaterials), new { id = material.Id }, materialDto);
        }

        // DELETE: api/materials/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMaterial(int id)
        {
            var material = _context.Materials.Find(id);
            if (material == null)
                return NotFound();

            _context.Materials.Remove(material);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

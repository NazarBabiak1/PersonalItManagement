using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalITManagement.Data.Context;
using PersonalItManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace PersonalItManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/employees
        [HttpGet]
        public ActionResult<IEnumerable<EmployeeDTO>> GetEmployees()
        {
            var employees = _context.Employees
                .Include(e => e.User)
                .Select(e => new EmployeeDTO
                {
                    Id = e.Id,
                    UserId = e.UserId,
                    Percentage = e.Percentage
                })
                .ToList();

            return Ok(employees);
        }

        // POST: api/employees
        [HttpPost]
        public ActionResult<EmployeeDTO> CreateEmployee([FromBody] EmployeeDTO employeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var employee = new Employee
            {
                UserId = employeeDto.UserId,
                Percentage = employeeDto.Percentage
            };

            _context.Employees.Add(employee);
            _context.SaveChanges();

            employeeDto.Id = employee.Id; // оновлюємо Id після збереження

            return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employeeDto);
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
                return NotFound();

            _context.Employees.Remove(employee);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

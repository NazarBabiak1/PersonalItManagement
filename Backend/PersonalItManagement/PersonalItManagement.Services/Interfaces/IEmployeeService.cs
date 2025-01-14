using PersonalItManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(int id);
    }
}

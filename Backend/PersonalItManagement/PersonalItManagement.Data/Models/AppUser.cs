using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Models
{
    public class AppUser : IdentityUser
    { 
        public double? Salary { get; set; }

    }
}
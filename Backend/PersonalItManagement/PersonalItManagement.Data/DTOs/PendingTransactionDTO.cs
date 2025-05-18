using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalItManagement.Data.DTOs
{
    public class PendingTransactionDTO
    {
        public string UserId { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public IFormFile? Photo { get; set; }
    }

}

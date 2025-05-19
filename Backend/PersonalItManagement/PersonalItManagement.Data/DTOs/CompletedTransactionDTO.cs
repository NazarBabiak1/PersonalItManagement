using Microsoft.AspNetCore.Http;

namespace PersonalItManagement.Data.DTOs
{
    public class CompletedTransactionDTO
    {
        public string UserId { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public IFormFile? Photo { get; set; }
    }
}
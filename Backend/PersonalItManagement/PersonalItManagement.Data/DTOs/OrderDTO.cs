public class OrderDTO
{
    public int Id { get; set; }
    public int BoardId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal RemainingAmount { get; set; }
    public List<int> EmployeeId { get; set; }
    public List<int> Equipments { get; set; }
    public List<int> Materials { get; set; }
    public List<int> Works { get; set; }
}

public class CreateOrderDTO
{
    public int Id { get; set; }
    public int BoardId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal PaidAmount { get; set; }
    public List<int> EmployeeId { get; set; }
    public List<int> Equipments { get; set; }
    public List<int> Materials { get; set; }
    public List<int> Works { get; set; }
}
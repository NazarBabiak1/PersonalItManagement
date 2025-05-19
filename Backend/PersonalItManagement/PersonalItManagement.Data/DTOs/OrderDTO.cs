public class OrderDTO
{
    public int Id { get; set; }
    public int BoardId { get; set; }
    public int OrderStatusId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal RemainingAmount { get; set; }

}

public class CreateOrderDTO
{
    public int Id { get; set; }
    public int BoardId { get; set; }
    public int OrderStatusId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal PaidAmount { get; set; }

}
public class OrderDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal RemainingAmount { get; set; }
    public List<EmployeeDTO> Employees { get; set; }
    public List<EquipmentDTO> Equipments { get; set; }
    public List<MaterialDTO> Materials { get; set; }
    public List<WorkDTO> Works { get; set; }
}
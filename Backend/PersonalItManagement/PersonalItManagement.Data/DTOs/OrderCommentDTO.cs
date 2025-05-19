public class OrderCommentDTO
{
    public int Id { get; set; }
    public string CommentText { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public string UserName { get; set; } = null!;
}
public class CreateOrderCommentDTO
{
    public int OrderId { get; set; }
    public string CommentText { get; set; } = null!;
    public string UserId { get; set; }
}
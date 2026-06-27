namespace Kanban.Api.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Status Status { get; set; } = Status.ToDo;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

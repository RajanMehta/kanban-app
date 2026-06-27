using Kanban.Api.Models;

namespace Kanban.Api.Dtos;

public record TaskResponseDto
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public Status Status { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}

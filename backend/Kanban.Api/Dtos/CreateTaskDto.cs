using System.ComponentModel.DataAnnotations;
using Kanban.Api.Models;

namespace Kanban.Api.Dtos;

public record CreateTaskDto
{
    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Title { get; init; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; init; }

    public Status Status { get; init; } = Status.ToDo;
}

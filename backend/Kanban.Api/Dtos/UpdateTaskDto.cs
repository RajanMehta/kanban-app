using System.ComponentModel.DataAnnotations;
using Kanban.Api.Models;

namespace Kanban.Api.Dtos;

public record UpdateTaskDto
{
    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Title { get; init; } = string.Empty;

    [StringLength(2000)]
    public string? Description { get; init; }

    [Required]
    public Status Status { get; init; }
}

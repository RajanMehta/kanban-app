using Kanban.Api.Dtos;
using Kanban.Api.Models;

namespace Kanban.Api.Mappings;

public static class TaskMappings
{
    public static TaskResponseDto ToResponseDto(this TaskItem task) => new()
    {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        Status = task.Status,
        CreatedAt = task.CreatedAt,
        UpdatedAt = task.UpdatedAt
    };

    public static TaskItem ToEntity(this CreateTaskDto dto) => new()
    {
        Title = dto.Title,
        Description = dto.Description,
        Status = dto.Status
    };
}

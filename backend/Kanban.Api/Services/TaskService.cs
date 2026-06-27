using Kanban.Api.Data;
using Kanban.Api.Dtos;
using Kanban.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Kanban.Api.Services;

public class TaskService : ITaskService
{
    private readonly KanbanDbContext _db;

    public TaskService(KanbanDbContext db) => _db = db;

    public async Task<IEnumerable<TaskResponseDto>> GetAllAsync()
    {
        var tasks = await _db.Tasks
            .OrderBy(t => t.CreatedAt)
            .ToListAsync();

        return tasks.Select(t => t.ToResponseDto());
    }

    public async Task<TaskResponseDto?> GetByIdAsync(int id)
    {
        var task = await _db.Tasks.FindAsync(id);
        return task?.ToResponseDto();
    }

    public async Task<TaskResponseDto> CreateAsync(CreateTaskDto dto)
    {
        var now = DateTime.UtcNow;

        var task = dto.ToEntity();
        task.CreatedAt = now;
        task.UpdatedAt = now;

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        return task.ToResponseDto();
    }

    public async Task<TaskResponseDto?> UpdateAsync(int id, UpdateTaskDto dto)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task is null)
        {
            return null;
        }

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return task.ToResponseDto();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task is null)
        {
            return false;
        }

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();

        return true;
    }
}

using Kanban.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Kanban.Api.Data;

public class KanbanDbContext : DbContext
{
    public KanbanDbContext(DbContextOptions<KanbanDbContext> options) : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var task = modelBuilder.Entity<TaskItem>();

        task.Property(t => t.Title).IsRequired().HasMaxLength(200);
        task.Property(t => t.Description).HasMaxLength(2000);

        // Store the enum as readable text ("ToDo") instead of an integer.
        task.Property(t => t.Status).HasConversion<string>().HasMaxLength(20);
    }
}

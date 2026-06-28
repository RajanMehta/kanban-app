import { useState } from 'react';
import { useTasks } from '../state/TasksContext';
import type { Task } from '../types/task';
import { EditTaskForm } from './EditTaskForm';

interface CardProps {
  task: Task;
}

export function Card({ task }: CardProps) {
  const { deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm(`Delete "${task.title}"?`)) {
      return;
    }

    setDeleting(true);
    setError(null);
    try {
      await deleteTask(task.id);
      // On success the task leaves the state, so this card unmounts.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <article className="card">
        <EditTaskForm task={task} onClose={() => setIsEditing(false)} />
      </article>
    );
  }

  return (
    <article className="card">
      <div className="card-row">
        <div className="card-main">
          <h3 className="card-title">{task.title}</h3>
          {task.description && <p className="card-desc">{task.description}</p>}
        </div>
        <div className="card-actions">
          <button
            className="card-edit"
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
          >
            ✎
          </button>
          <button
            className="card-delete"
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
          >
            ×
          </button>
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}
    </article>
  );
}

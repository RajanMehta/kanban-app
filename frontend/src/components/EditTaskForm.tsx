import { useState } from 'react';
import type { FormEvent } from 'react';
import { COLUMNS } from '../board/columns';
import { useTasks } from '../state/TasksContext';
import type { Status, Task } from '../types/task';

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

export function EditTaskForm({ task, onClose }: EditTaskFormProps) {
  const { updateTask } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? '');
  const [status, setStatus] = useState<Status>(task.status);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title is required');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await updateTask(task.id, {
        title: trimmed,
        description: description.trim() || null,
        status,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      setSubmitting(false);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-input"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        autoFocus
      />
      <textarea
        className="add-input"
        placeholder="Description (optional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={2}
      />
      <select
        className="add-input"
        value={status}
        onChange={(event) => setStatus(event.target.value as Status)}
      >
        {COLUMNS.map((column) => (
          <option key={column.status} value={column.status}>
            {column.title}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
      <div className="add-actions">
        <button className="btn primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save'}
        </button>
        <button className="btn" type="button" onClick={onClose} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

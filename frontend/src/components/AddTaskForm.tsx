import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTasks } from '../state/TasksContext';
import type { Status } from '../types/task';

interface AddTaskFormProps {
  status: Status;
}

export function AddTaskForm({ status }: AddTaskFormProps) {
  const { createTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setError(null);
    setSubmitting(false);
  }

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
      await createTask({
        title: trimmed,
        description: description.trim() || null,
        status,
      });
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
      setSubmitting(false);
    }
  }

  if (!isOpen) {
    return (
      <button className="add-toggle" type="button" onClick={() => setIsOpen(true)}>
        + Add a task
      </button>
    );
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
      {error && <p className="form-error">{error}</p>}
      <div className="add-actions">
        <button className="btn primary" type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add'}
        </button>
        <button className="btn" type="button" onClick={close} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

import type { Task } from '../types/task';

interface CardProps {
  task: Task;
}

export function Card({ task }: CardProps) {
  return (
    <article className="card">
      <h3 className="card-title">{task.title}</h3>
      {task.description && <p className="card-desc">{task.description}</p>}
    </article>
  );
}

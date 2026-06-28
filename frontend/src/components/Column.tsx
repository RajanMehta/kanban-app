import type { Task } from '../types/task';
import { Card } from './Card';

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <section className="column">
      <header className="column-header">
        <h2>{title}</h2>
        <span className="count">{tasks.length}</span>
      </header>
      <div className="column-body">
        {tasks.length === 0 ? (
          <p className="empty">No tasks</p>
        ) : (
          tasks.map((task) => <Card key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}

import { useDroppable } from '@dnd-kit/core';
import type { Status, Task } from '../types/task';
import { AddTaskForm } from './AddTaskForm';
import { Card } from './Card';

interface ColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
}

export function Column({ title, status, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section ref={setNodeRef} className={`column ${isOver ? 'column-over' : ''}`}>
      <header className="column-header">
        <h2>{title}</h2>
        <span className="count">{tasks.length}</span>
      </header>
      <div className="column-body">
        {tasks.length === 0 ? (
          <p className="empty">Drop tasks here</p>
        ) : (
          tasks.map((task) => <Card key={task.id} task={task} />)
        )}
      </div>
      <AddTaskForm status={status} />
    </section>
  );
}

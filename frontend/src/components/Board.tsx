import { COLUMNS } from '../board/columns';
import { useTasks } from '../state/TasksContext';
import { Column } from './Column';

export function Board() {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <p className="status-msg">Loading tasks…</p>;
  }

  if (error) {
    return <p className="status-msg error">Failed to load tasks: {error}</p>;
  }

  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  );
}

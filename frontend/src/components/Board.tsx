import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { COLUMNS } from '../board/columns';
import { useTasks } from '../state/TasksContext';
import type { Status } from '../types/task';
import { Column } from './Column';

export function Board() {
  const { tasks, loading, error, moveTask } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const task = tasks.find((t) => t.id === active.id);
    const newStatus = over.id as Status;

    if (task && task.status !== newStatus) {
      moveTask(task, newStatus).catch(() => {
        // moveTask already rolled the card back; nothing else to do here.
      });
    }
  }

  if (loading) {
    return <p className="status-msg">Loading tasks…</p>;
  }

  if (error) {
    return <p className="status-msg error">Failed to load tasks: {error}</p>;
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
}

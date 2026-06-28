import { useCallback, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import { ApiError } from '../api/client';
import { tasksApi } from '../api/tasks';
import type { CreateTaskInput, Status, Task, UpdateTaskInput } from '../types/task';
import { TasksContext } from './TasksContext';
import type { TasksContextValue } from './TasksContext';
import { initialTasksState, tasksReducer } from './tasksReducer';

function messageOf(error: unknown): string {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);

  const refresh = useCallback(async () => {
    dispatch({ type: 'load_start' });
    try {
      const tasks = await tasksApi.getAll();
      dispatch({ type: 'load_success', tasks });
    } catch (error) {
      dispatch({ type: 'load_error', error: messageOf(error) });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createTask = useCallback(async (input: CreateTaskInput) => {
    const created = await tasksApi.create(input);
    dispatch({ type: 'upsert', task: created });
  }, []);

  const updateTask = useCallback(async (id: number, input: UpdateTaskInput) => {
    const updated = await tasksApi.update(id, input);
    dispatch({ type: 'upsert', task: updated });
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    await tasksApi.remove(id);
    dispatch({ type: 'remove', id });
  }, []);

  const moveTask = useCallback(async (task: Task, status: Status) => {
    if (task.status === status) {
      return;
    }
    // Optimistic update: move the card immediately for a snappy UI...
    dispatch({ type: 'upsert', task: { ...task, status } });
    try {
      const updated = await tasksApi.update(task.id, {
        title: task.title,
        description: task.description,
        status,
      });
      dispatch({ type: 'upsert', task: updated });
    } catch (error) {
      // ...and roll back to the original card if the server rejects it.
      dispatch({ type: 'upsert', task });
      throw error;
    }
  }, []);

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks: state.tasks,
      loading: state.loading,
      error: state.error,
      refresh,
      createTask,
      updateTask,
      deleteTask,
      moveTask,
    }),
    [state, refresh, createTask, updateTask, deleteTask, moveTask],
  );

  return <TasksContext value={value}>{children}</TasksContext>;
}

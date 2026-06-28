import { createContext, useContext } from 'react';
import type { CreateTaskInput, Status, Task, UpdateTaskInput } from '../types/task';

export interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (id: number, input: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  moveTask: (task: Task, status: Status) => Promise<void>;
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

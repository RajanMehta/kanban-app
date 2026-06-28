import type { Task } from '../types/task';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export type TasksAction =
  | { type: 'load_start' }
  | { type: 'load_success'; tasks: Task[] }
  | { type: 'load_error'; error: string }
  | { type: 'upsert'; task: Task }
  | { type: 'remove'; id: number };

export const initialTasksState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'load_start':
      return { ...state, loading: true, error: null };
    case 'load_success':
      return { ...state, loading: false, tasks: action.tasks };
    case 'load_error':
      return { ...state, loading: false, error: action.error };
    case 'upsert': {
      const exists = state.tasks.some((t) => t.id === action.task.id);
      const tasks = exists
        ? state.tasks.map((t) => (t.id === action.task.id ? action.task : t))
        : [...state.tasks, action.task];
      return { ...state, tasks };
    }
    case 'remove':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

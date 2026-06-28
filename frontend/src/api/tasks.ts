import type { CreateTaskInput, Task, UpdateTaskInput } from '../types/task';
import { apiRequest } from './client';

export const tasksApi = {
  getAll: () => apiRequest<Task[]>('/api/tasks'),

  getById: (id: number) => apiRequest<Task>(`/api/tasks/${id}`),

  create: (input: CreateTaskInput) =>
    apiRequest<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  update: (id: number, input: UpdateTaskInput) =>
    apiRequest<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }),

  remove: (id: number) =>
    apiRequest<void>(`/api/tasks/${id}`, {
      method: 'DELETE',
    }),
};

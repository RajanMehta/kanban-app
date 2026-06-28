export type Status = 'ToDo' | 'InProgress' | 'Done';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  status?: Status;
}

export interface UpdateTaskInput {
  title: string;
  description?: string | null;
  status: Status;
}

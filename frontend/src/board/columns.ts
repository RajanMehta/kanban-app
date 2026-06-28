import type { Status } from '../types/task';

export interface ColumnConfig {
  status: Status;
  title: string;
}

export const COLUMNS: ColumnConfig[] = [
  { status: 'ToDo', title: 'To Do' },
  { status: 'InProgress', title: 'In Progress' },
  { status: 'Done', title: 'Done' },
];

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TasksProvider } from './state/TasksProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <TasksProvider>
        <App />
      </TasksProvider>
    </ErrorBoundary>
  </StrictMode>,
);

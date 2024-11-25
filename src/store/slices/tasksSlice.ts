import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TasksState {
  tasks: Task[];
  lists: string[];
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

interface Notification {
  id: string;
  taskId: string;
  message: string;
  date: string;
  isRead: boolean;
}

const initialState: TasksState = {
  tasks: [],
  lists: ['To Do', 'Personal', 'Work', 'Shopping'],
  notifications: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updatePriority: (state, action: PayloadAction<{ id: string; priority: Task['priority'] }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    addList: (state, action: PayloadAction<string>) => {
      if (!state.lists.includes(action.payload)) {
        state.lists.push(action.payload);
      }
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    refreshTasks: (state) => {
      state.tasks = state.tasks.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    updateTaskDate: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.dueDate = action.payload.date;
      }
    }
  },
});

export const {
  addTask,
  removeTask,
  toggleTask,
  updatePriority,
  addList,
  addNotification,
  markNotificationAsRead,
  refreshTasks,
  updateTaskDate
} = tasksSlice.actions;
export default tasksSlice.reducer;
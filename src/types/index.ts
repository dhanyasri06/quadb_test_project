export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  list?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}
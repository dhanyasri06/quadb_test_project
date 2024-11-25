import React from 'react';
import { useDispatch } from 'react-redux';
import { Star, Trash2 } from 'lucide-react';
import { removeTask, toggleTask, updatePriority } from '../store/slices/tasksSlice';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className={`group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <button
        onClick={() => dispatch(toggleTask(task.id))}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      <span className={`flex-1 text-sm ${
        task.completed
          ? 'text-gray-500 dark:text-gray-400 line-through'
          : 'text-gray-900 dark:text-white'
      }`}>
        {task.title}
      </span>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => dispatch(updatePriority({ id: task.id, priority: task.priority === 'high' ? 'medium' : 'high' }))}
          className={`p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 ${
            task.priority === 'high'
              ? 'text-yellow-500'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <Star className="w-4 h-4" />
        </button>
        <button
          onClick={() => dispatch(removeTask(task.id))}
          className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
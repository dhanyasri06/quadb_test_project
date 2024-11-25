import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { RootState } from '../store';
import { updateTaskDate } from '../store/slices/tasksSlice';

interface CalendarPanelProps {
  onClose: () => void;
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleDateChange = (taskId: string, date: string) => {
    dispatch(updateTaskDate({ id: taskId, date }));
  };

  return (
    <div className="absolute top-20 right-0 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task Calendar</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className="mb-4 last:mb-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">{task.title}</span>
              <input
                type="date"
                value={task.dueDate || ''}
                onChange={(e) => handleDateChange(task.id, e.target.value)}
                className="text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPanel;
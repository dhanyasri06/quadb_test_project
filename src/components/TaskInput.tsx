import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Bell, Calendar } from 'lucide-react';
import { addTask, addNotification } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import { Task } from '../types';

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const currentList = useSelector((state: RootState) => state.tasks.lists[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || undefined,
      list: currentList,
    };

    dispatch(addTask(newTask));

    if (reminder && dueDate) {
      dispatch(
        addNotification({
          id: crypto.randomUUID(),
          taskId: newTask.id,
          message: `Reminder: ${newTask.title} is due ${new Date(dueDate).toLocaleDateString()}`,
          date: new Date().toISOString(),
          isRead: false,
        })
      );
    }

    setTitle('');
    setDueDate('');
    setReminder(false);
    setShowDatePicker(false);
  };

  const styles = {
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '16px',
    },
    searchIcon: {
      marginRight: '8px',
      color: '#888',
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      width: '100%',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task"
            className="flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setReminder(!reminder)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                reminder
                  ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                showDatePicker
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Add task
            </button>
          </div>
        </div>
        {showDatePicker && (
          <div className="mt-4">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskInput;

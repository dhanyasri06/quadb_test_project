import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { Bell, RotateCcw, Calendar, Plus } from 'lucide-react';
import { RootState } from '../store';
import { refreshTasks, addList } from '../store/slices/tasksSlice';
import NotificationsPanel from './NotificationsPanel';
import CalendarPanel from './CalendarPanel';

const MainContent = () => {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  
  const lists = useSelector((state: RootState) => state.tasks.lists);
  const notifications = useSelector((state: RootState) => state.tasks.notifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleRefresh = () => {
    dispatch(refreshTasks());
  };

  const handleAddList = () => {
    if (newListName.trim()) {
      dispatch(addList(newListName.trim()));
      setNewListName('');
      setShowNewList(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <select className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-none focus:ring-0">
              {lists.map(list => (
                <option key={list}>{list}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleRefresh}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowNewList(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showNewList && (
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list name"
              className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddList}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add List
            </button>
            <button
              onClick={() => setShowNewList(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        )}

        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}

        {showCalendar && (
          <CalendarPanel onClose={() => setShowCalendar(false)} />
        )}

        <div className="space-y-6">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
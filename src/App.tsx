import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar />
      <MainContent />
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;

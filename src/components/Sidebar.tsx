import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ListTodo, Star, Calendar, UserCircle, Plus } from 'lucide-react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=22c55e&color=fff`}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hey,</p>
            <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
          </div>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<ListTodo />} label="All Tasks" active />
          <NavItem icon={<Calendar />} label="Today" count={tasks.filter(t => !t.completed).length} />
          <NavItem icon={<Star />} label="Important" />
          <NavItem icon={<Calendar />} label="Planned" />
          <NavItem icon={<UserCircle />} label="Assigned to me" />
        </nav>

        <button className="mt-6 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <Plus className="w-5 h-5" />
          <span>Add list</span>
        </button>

        <div className="mt-8">
          <div style={styles.container}>
            <div style={styles.header}>
              <h3 style={styles.title}>Today's Tasks</h3>
              <span style={styles.infoIcon}>ℹ️</span>
            </div>
            <Doughnut
              data={{
                labels: ["Done", "Pending"],
                datasets: [
                  {
                    data: [completedTasks, totalTasks - completedTasks],
                    backgroundColor: ["#4CAF50", "#006400"],
                    hoverBackgroundColor: ["#66BB6A", "#004d00"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={options}
            />
            <div style={styles.labels}>
              <div style={styles.labelItem}>
                <div style={{ ...styles.labelDot, backgroundColor: "#4CAF50" }}></div>
                <span>Done</span>
              </div>
              <div style={styles.labelItem}>
                <div style={{ ...styles.labelDot, backgroundColor: "#006400" }}></div>
                <span>Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "#f9fafb",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    marginTop: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#374151",
    margin: 0,
  },
  infoIcon: {
    fontSize: "1rem",
    color: "#9ca3af",
    cursor: "pointer",
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  labelItem: {
    display: "flex",
    alignItems: "center",
  },
  labelDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "8px",
  },
};

const options: ChartOptions<"doughnut"> = {
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

const NavItem = ({ icon, label, count, active }: { icon: React.ReactNode; label: string; count?: number; active?: boolean }) => (
  <button
    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm rounded-lg transition-colors duration-200
      ${active
        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
  >
    {icon}
    <span>{label}</span>
    {count !== undefined && (
      <span className="ml-auto text-xs font-medium text-gray-600 dark:text-gray-400">{count}</span>
    )}
  </button>
);

export default Sidebar;

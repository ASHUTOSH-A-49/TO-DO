import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const getSectionLabel = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const compareDate = new Date(dateStr);
  compareDate.setHours(0, 0, 0, 0);

  if (compareDate < today) return 'Overdue';
  if (compareDate.getTime() === today.getTime()) return 'Today';
  if (compareDate.getTime() === tomorrow.getTime()) return 'Tomorrow';
  return 'Upcoming';
};

const TodoList = () => {
  const { todos } = useTodo();

  const [collapsed, setCollapsed] = React.useState({
    Overdue: false,
    Today: false,
    Tomorrow: false,
    Upcoming: false,
    'No Deadline': false,
    Completed: false,
  });

  const toggleCollapse = (section) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Initialize sections
  const sections = {
    Overdue: [],
    Today: [],
    Tomorrow: [],
    Upcoming: [],
    'No Deadline': [],
    Completed: [],
  };

  // Categorize todos
  todos.forEach((todo) => {
    if (todo.completed) {
      sections.Completed.push(todo);
    } else if (!todo.deadline) {
      sections['No Deadline'].push(todo);
    } else {
      const section = getSectionLabel(todo.deadline);
      sections[section].push(todo);
    }
  });

  const sectionOrder = [
    'Overdue',
    'Today',
    'Tomorrow',
    'Upcoming',
    'No Deadline',
    'Completed',
  ];

  const sectionEmojis = {
    Overdue: '⚠️',
    Today: '📅',
    Tomorrow: '⏭️',
    Upcoming: '🔜',
    'No Deadline': '📝',
    Completed: '✅',
  };

  return (
    <div className="space-y-4 mx-auto">
      {sectionOrder.map((section) =>
        sections[section].length > 0 ? (
          <div key={section} className="bg-white/10 rounded-lg px-4 py-3">
            <div
              className="flex justify-between items-center cursor-pointer select-none mb-2"
              onClick={() => toggleCollapse(section)}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {sectionEmojis[section]} {section}
              </h2>
              <span className="text-white text-lg sm:text-xl">
                {collapsed[section] ? '▼' : '▲'}
              </span>
            </div>
            {!collapsed[section] && (
              <div className="space-y-3">
                {sections[section]
                  .sort((a, b) =>
                    new Date(a.deadline || 0) - new Date(b.deadline || 0)
                  )
                  .map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
};

export default TodoList;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Check, X, Plus } from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Complete project proposal', status: 'pending' },
  { id: 2, title: 'Design meeting with client', status: 'pending' },
  { id: 3, title: 'Update weekly statistics', status: 'completed' },
  { id: 4, title: 'Review marketing materials', status: 'pending' },
  { id: 5, title: 'Send follow-up emails', status: 'completed' },
];

const TasksList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: newTaskTitle,
      status: 'pending',
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Tasks</h3>
        <div className="flex space-x-2 text-sm">
          {['all', 'pending', 'completed'].map(status => (
            <button
              key={status}
              className={`px-2 py-1 rounded-md transition-colors ${
                filter === status
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-md border ${
                task.status === 'completed'
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full mr-3 ${
                    task.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'border-2 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {task.status === 'completed' && <Check size={12} />}
                </button>

                <span className={task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No tasks found
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-600 dark:text-gray-300 placeholder-gray-400"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />
          <Button
            variant="primary"
            className="rounded-l-none"
            leftIcon={<Plus size={16} />}
            onClick={addTask}
          >
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TasksList;

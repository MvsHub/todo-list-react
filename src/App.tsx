import  { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './api';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Main/MainContent';
import AddTask from './pages/AddTask/AddTask';
import TaskList from './pages/TaskList/TaskList';
import CompletedTasks from './pages/CompletedTasks/CompletedTasks';
import PendingTasks from './pages/PendingTasks/PendingTasks';
import taskReducer from './reducers/taskReducer';
import { Task } from './types';
import './App.css';

const initialState = { tasks: [] as Task[] };

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    api.get('/tasks')
      .then(response => {
        dispatch({ type: 'SET_TASKS', payload: response.data });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const addTask = (taskName: string) => {
    api.post('/tasks', { name: taskName, completed: false, completedAt: null })
      .then(response => {
        dispatch({ type: 'ADD_TASK', payload: response.data });
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const removeTask = (taskId: number) => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        dispatch({ type: 'REMOVE_TASK', payload: taskId });
      })
      .catch(error => {
        console.error('Error removing task:', error);
      });
  };

  const toggleTask = (taskId: number) => {
    const task = state.tasks.find((task: Task) => task.id === taskId);
    if (task) {
      const updatedTask: Task = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : null
      };
      api.put(`/tasks/${taskId}`, updatedTask)
        .then(() => {
          dispatch({ type: 'TOGGLE_TASK', payload: updatedTask });
        })
        .catch(error => {
          console.error('Error toggling task:', error);
        });
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={
              <>
                <h1>Pendências</h1>
                <AddTask onAddTask={addTask} />
                <TaskList tasks={state.tasks} onRemoveTask={removeTask} onToggleTask={toggleTask} />
              </>
            } />
            <Route path="/completed" element={<CompletedTasks tasks={state.tasks} />} />
            <Route path="/pending" element={<PendingTasks tasks={state.tasks} />} />
          </Routes>
        </MainContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import { useReducer, useEffect } from 'react';
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
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        dispatch({ type: 'SET_TASKS', payload: response.data });
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Tarefas atualizadas:", state.tasks);
  }, [state.tasks]);

  const addTask = async (taskName: string) => {
    try {
      const response = await api.post('/tasks', { name: taskName, completed: false, completedAt: null });
      dispatch({ type: 'ADD_TASK', payload: response.data });
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const removeTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      dispatch({ type: 'REMOVE_TASK', payload: taskId });
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  const toggleTask = async (taskId: number) => {
    const task = state.tasks.find((task: Task) => task.id === taskId);
    if (task) {
      const updatedTask: Task = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : null
      };

      try {
        await api.put(`/tasks/${taskId}`, updatedTask);
        dispatch({ type: 'TOGGLE_TASK', payload: updatedTask });
      } catch (error) {
        console.error('Erro ao alternar estado da tarefa:', error);
      }
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
                {state.tasks.length > 0 ? (
                  <TaskList tasks={state.tasks} onRemoveTask={removeTask} onToggleTask={toggleTask} />
                ) : (
                  <p>Nenhuma tarefa adicionada.</p>
                )}
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

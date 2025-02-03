import React from 'react';
import { Task } from '../../types';
import styled from 'styled-components';

interface PendingTasksProps {
  tasks: Task[];
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 50vw;
`;

const ListItem = styled.li<{ completed: boolean }>`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const PendingTasks: React.FC<PendingTasksProps> = ({ tasks }) => {
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div>
      <h1>Tarefas Pendentes</h1>
      <List>
        {pendingTasks.map(task => (
          <ListItem key={task.id} completed={task.completed}>
            {task.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PendingTasks;

import React, { useState } from 'react';
import styled from 'styled-components';

interface AddTaskProps {
  onAddTask: (taskName: string) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column; /* Alinha input e botão em coluna */
  align-items: center;
  margin-bottom: 20px;
  width: 50vw;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px; /* Adiciona um espaço entre o input e o botão */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: rgb(5, 35, 53);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Faz o botão ocupar toda a largura */
  text-align: center;

  &:hover {
    background-color: rgb(2, 20, 30);
  }
`;

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim() === '') return; // Evita adicionar tarefas vazias
    onAddTask(taskName);
    setTaskName(''); // Limpa o campo após adicionar
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Adicione uma nova tarefa"
      />
      <Button type="submit">Adicionar</Button>
    </Form>
  );
};

export default AddTask;

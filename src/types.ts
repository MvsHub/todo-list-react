export interface Task {
    id: number;
    name: string;
    completed: boolean;
    completedAt?: Date | null; // Campo opcional para armazenar a data de conclusão
}
  
  
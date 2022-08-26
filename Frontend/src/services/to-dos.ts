import axios from "axios";

export interface ToDo {
  ID: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
  title: string;
  status: string;
  description: string;
}

axios.defaults.headers.common["authorization"] = `${localStorage.getItem(
  "token"
)}`;

export const getAllTodos = async () => {
  const { data } = await axios.get<ToDo[]>("http://localhost:8082/tasks");
  return data;
};

export const getTodo = async (ID: number) => {
  const { data } = await axios.get<ToDo>(`http://localhost:8082/tasks/${ID}`);
  return data;
};

export const createTodo = async (todo: {
  title: string;
  description: string;
  Status: string;
}) => {
  const { data } = await axios.post<ToDo>("http://localhost:8082/tasks", todo);
  return data;
};

export const updateTodo = async (
  ID: number,
  todo: {
    title?: string;
    description?: string;
    Status?: string;
  }
) => {
  const { data } = await axios.put<ToDo>(
    `http://localhost:8082/tasks/${ID}`,
    todo
  );
  return data;
};

export const deleteTodo = async (ID: number) => {
  const { data } = await axios.delete<ToDo>(
    `http://localhost:8082/tasks/${ID}`
  );
  return data;
};

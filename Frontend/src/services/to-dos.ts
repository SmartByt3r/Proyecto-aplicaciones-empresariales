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
  const { data } = await axios.get<ToDo[]>("/tasks/");
  return data;
};

export const getTodo = async (ID: number) => {
  const { data } = await axios.get<ToDo>(`/${ID}`);
  return data;
};

export const createTodo = async (todo: {
  title: string;
  description: string;
  status: string;
}) => {
  const { data } = await axios.post<ToDo>("/tasks/", todo);
  return data;
};

export const updateTodo = async (
  ID: number,
  todo: {
    title?: string;
    description?: string;
    status?: string;
  }
) => {
  const todoResponse = await axios.get<ToDo>(`/tasks/${ID}`);
  const { data } = await axios.put<ToDo>(`/tasks/${ID}`, {
    title: todo.title || todoResponse.data.title,
    description: todo.description || todoResponse.data.description,
    status: todo.status || todoResponse.data.status,
  });
  return data;
};

export const deleteTodo = async (ID: number) => {
  const { data } = await axios.delete<ToDo>(`/tasks/${ID}`);
};

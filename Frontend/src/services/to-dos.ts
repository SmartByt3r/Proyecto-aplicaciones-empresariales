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

export const getAllTodos = async (token: string) => {
  const { data } = await axios.get<ToDo[]>("/tasks/", {
    headers: {
      authorization: token,
    },
  });
  return data;
};

export const getTodo = async (ID: number, token: string) => {
  const { data } = await axios.get<ToDo>(`/${ID}`, {
    headers: {
      authorization: token,
    },
  });
  return data;
};

export const createTodo = async (
  todo: {
    title: string;
    description: string;
    status: string;
  },
  token: string
) => {
  const { data } = await axios.post<ToDo>("/tasks/", todo, {
    headers: {
      authorization: token,
    },
  });
  return data;
};

export const updateTodo = async (
  ID: number,
  todo: {
    title?: string;
    description?: string;
    status?: string;
  },
  token: string
) => {
  const todoResponse = await axios.get<ToDo>(`/tasks/${ID}`, {
    headers: {
      authorization: token,
    },
  });
  const { data } = await axios.put<ToDo>(
    `/tasks/${ID}`,
    {
      title: todo.title || todoResponse.data.title,
      description: todo.description || todoResponse.data.description,
      status: todo.status || todoResponse.data.status,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
  return data;
};

export const deleteTodo = async (ID: number, token: string) => {
  const { data } = await axios.delete<ToDo>(`/tasks/${ID}`, {
    headers: {
      authorization: token,
    },
  });
};

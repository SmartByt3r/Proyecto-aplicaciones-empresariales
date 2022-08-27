import axios from "axios";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const login = async (email: string, password: string) => {
  const {
    data: { token },
  } = await axios.post<{ token: string }>("http://localhost:8081/api/token", {
    email,
    password,
  });
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.clear();
};

export const registerUser = async (user: User) => {
  const { data } = await axios.post<{
    email: string;
    userId: number;
    username: string;
  }>("http://localhost:8081/api/user", user);
  return data;
};

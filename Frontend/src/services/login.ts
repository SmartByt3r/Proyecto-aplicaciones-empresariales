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
  } = await axios.post<{ token: string }>("/api/token", {
    email,
    password,
  });
  console.log("token:", token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const registerUser = async (user: User) => {
  const { data } = await axios.post<{
    email: string;
    userId: number;
    username: string;
  }>("/api/user", user);
  return data;
};

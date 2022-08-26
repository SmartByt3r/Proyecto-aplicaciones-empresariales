import axios from "axios";

export const login = async (email: string, password: string) => {
  const {
    data: { token },
  } = await axios.post<{ token: string }>("http://localhost:8080/api/token", {
    email,
    password,
  });
  localStorage.setItem("token", token);
};

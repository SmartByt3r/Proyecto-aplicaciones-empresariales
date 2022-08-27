import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

export const AuthContext = React.createContext<{
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}>({} as any);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = React.useState<string>("");
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

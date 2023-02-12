import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { IAuthContext } from "../interfaces/AuthContext.interface";
import { IContextProvider } from "../interfaces/Context.interfaces";
import { ILoginData } from "../pages/Login/LoginForm";
import { api } from "../services/api";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IContextProvider) => {
  const [token, setToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const login = async (loginData: ILoginData) => {
    setIsFetching(true);
    api
      .post("login/", loginData)
      .then((response) => {
        setToken(response.data.access);
        toast.success("Login Realizado com Sucesso");
      })
      .catch((error) => {
        toast.error("Usuário ou Senha Inválidos");
        setError(error);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <AuthContext.Provider value={{ login, token, isFetching, error }}>
      {children}
    </AuthContext.Provider>
  );
};

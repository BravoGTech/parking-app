import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { IAuthContext } from "../interfaces/AuthContext.interface";
import { IContextProvider } from "../interfaces/Context.interfaces";
import { ILoginData } from "../components/LoginForm";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IContextProvider) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const navigate = useNavigate();''

  const login = async (loginData: ILoginData) => {
    setIsFetching(true);
    api
      .post("/login", loginData)
      .then((response) => {
        localStorage.setItem("@Parking:Token", response.data.token);
        toast.success("Login Realizado com Sucesso");
        const { isAdmin }: any = jwt_decode(response.data.token);

        isAdmin ? navigate("/controlPainelAdmin") : navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Usuário ou Senha Inválidos");
        setError(error);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <AuthContext.Provider value={{ login, isFetching, error }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IContextProvider } from "../interfaces/Context.interfaces";
import {
  IDeleteData,
  IRegisterUserProps,
  IUpdateUserProps,
  IUserDataWithSales,
  IUsersContextData,
} from "../interfaces/UsersContext.interfaces";
import { api } from "../services/api";

export const UsersContext = createContext<IUsersContextData>(
  {} as IUsersContextData
);

export const UsersProvider = ({ children }: IContextProvider) => {
  const [userData, setUserData] = useState<IUserDataWithSales>();

  const { data, isFetching, error, refetch } = useQuery("users", async () => {
    const token = localStorage.getItem("@Parking:Token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/users");
    return response.data;
  });

  const { mutate: listUser } = useMutation(
    async (userId: string): Promise<IUserDataWithSales> => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.get(`/users/${userId}`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        setUserData(response);
        refetch();
      },
      onError: () => {
        toast.error("Usuario não encontrado");
      },
    }
  );

  const { mutate: registerUser } = useMutation(
    async ({ data, onClose }: IRegisterUserProps) => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api.post("/users", data).then((response) => {
        onClose();
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        toast.success("Usuário cadastrado com sucesso");
        refetch();
      },
      onError: () => {
        toast.error("Username já registrado");
      },
    }
  );

  const { mutate: deleteUser } = useMutation(
    async ({ userId, onClose }: IDeleteData) => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api.delete(`/users/${userId}/`).then((response) => {
        onClose();
        return response.data;
      });
    },
    {
      onSuccess: (_) => {
        toast.success("Funcionário deletado");
        refetch();
      },
      onError: () => {
        toast.error("Usuário já deletado");
      },
    }
  );

  const { mutate: updateUser } = useMutation(
    async ({ data, userId, onClose }: IUpdateUserProps) => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api.patch(`/users/${userId}/`, data).then((response) => {
        onClose();
        return response.data;
      });
    },
    {
      onSuccess: (_) => {
        toast.success("Dados do Funcionário Atualizados");
        refetch();
      },
      onError: () => {
        toast.error("Funcionário não existe");
      },
    }
  );

  return (
    <UsersContext.Provider
      value={{
        data,
        isFetching,
        error,
        registerUser,
        deleteUser,
        updateUser,
        listUser,
        userData,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

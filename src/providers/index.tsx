import { AuthProvider } from "../contexts/AuthContext";
import { SalesProvider } from "../contexts/SalesContext";
import { UsersProvider } from "../contexts/UsersContext";
import { IContextProvider } from "../interfaces/Context.interfaces";

export const Providers = ({ children }: IContextProvider) => {
  return (
    <>
      <AuthProvider>
        <UsersProvider>
          <SalesProvider>{children}</SalesProvider>
        </UsersProvider>
      </AuthProvider>
    </>
  );
};

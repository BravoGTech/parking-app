import { AuthProvider } from "../contexts/AuthContext";
import { SalesProvider } from "../contexts/SalesContext";
import { IContextProvider } from "../interfaces/Context.interfaces";

export const Providers = ({ children }: IContextProvider) => {
  return (
    <>
      <AuthProvider>
        <SalesProvider>{children}</SalesProvider>
      </AuthProvider>
    </>
  );
};

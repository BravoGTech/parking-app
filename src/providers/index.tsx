import { AuthProvider } from "../contexts/AuthContext";
import { IContextProvider } from "../interfaces/Context.interfaces";

export const Providers = ({ children }: IContextProvider) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

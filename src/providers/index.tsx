import { AuthProvider } from "../contexts/AuthContext";
import { ParkingInfoProvider } from "../contexts/ParkingInfoContext";
import { SalesProvider } from "../contexts/SalesContext";
import { SpotContextProvider } from "../contexts/SpotContext";
import { UsersProvider } from "../contexts/UsersContext";

import { IContextProvider } from "../interfaces/Context.interfaces";

export const Providers = ({ children }: IContextProvider) => {
  return (
    <>
      <ParkingInfoProvider>
        <AuthProvider>
          <UsersProvider>
            <SpotContextProvider>
              <SalesProvider>{children}</SalesProvider>
            </SpotContextProvider>
          </UsersProvider>
        </AuthProvider>
      </ParkingInfoProvider>
    </>
  );
};

import React from "react";
import { IUser } from "@/types/account/user";

import { getUser } from "@/actions/account/get";

interface AccountContext {
  user: IUser | null;
  isLoading: boolean;
}

export const AccountContext = React.createContext<AccountContext>(
  {} as AccountContext
);

interface AccountProviderProps {
  children: React.ReactNode;
}

export default function AccountProvider({ children }: AccountProviderProps) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const retrieveUser = async () => {
    const { user } = await getUser();
    setUser(user);
    setIsLoading(false);
  };

  React.useEffect(() => {
    retrieveUser().finally(() => setIsLoading(false));
  }, []);

  return (
    <AccountContext.Provider value={{ user, isLoading }}>
      {children}
    </AccountContext.Provider>
  );
}

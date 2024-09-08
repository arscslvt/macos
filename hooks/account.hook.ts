import { AccountContext } from "@/contexts/account.context";
import React from "react";

export const useAccount = () => React.useContext(AccountContext);

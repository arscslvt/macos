import { SystemContext } from "@/contexts/system.context";
import React from "react";

export const useSystem = () => React.useContext(SystemContext);

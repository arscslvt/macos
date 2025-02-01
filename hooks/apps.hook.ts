import React from "react";
import { AppsContext } from "@/contexts/apps.context";

export const useApps = () => React.useContext(AppsContext);

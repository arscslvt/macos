type PackageTLD = "com" | "org" | "net" | "io" | "dev" | "app";
type PackageType = "app" | "web" | "api" | "cli" | "lib" | "mod" | "cmd";

export type PackageName = `${PackageTLD}.${string}.${string}.${PackageType}`;

export interface App {
  package: PackageName;

  details: AppDetails;

  repo?: string;
  website?: string;
  docs?: string;

  preferences?: AppPreferences;
}

export interface AppDetails {
  name: string;
  description: string;
  version: string;

  icon?: string;
  foregroundIcon?: string;
}

export type AppPriority = "low" | "medium" | "high" | "critical";

export interface AppPreferences {
  width?: number;
  height?: number;
  x?: number;
  y?: number;

  maximized?: boolean;

  priority?: AppPriority;
}

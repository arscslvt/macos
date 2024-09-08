import { Database } from "../database.types";

export type DatabaseCloudAccount =
  Database["public"]["Tables"]["profiles"]["Row"] & {};

import { defineSchema } from "convex/server";
import usersTable from "./schemas/users.table";

export default defineSchema({
  users: usersTable,
});

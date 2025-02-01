import { UserJSON, UserWebhookEvent } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { log } from "node:console";
import { api } from "@/convex/_generated/api";

const handleUserDeleted = async (event: UserWebhookEvent) => {
  log(`ℹ️ Handling user.created event with payload:`, event.data as UserJSON);

  const { id: tokenIdentifier } = event.data as UserJSON;

  // Delete the user from Sierra DB
  fetchMutation(api.users.delete.default, { tokenIdentifier });
};

export default handleUserDeleted;

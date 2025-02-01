import { UserJSON, UserWebhookEvent } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { log } from "node:console";
import { api } from "@/convex/_generated/api";

const handleUserCreated = async (event: UserWebhookEvent) => {
  log(`ℹ️ Handling user.created event with payload:`, event.data as UserJSON);

  const {
    first_name: firstName,
    last_name: lastName,
    email_addresses: emailAddresses,
    id: tokenIdentifier,
  } = event.data as UserJSON;

  // Add the user to Sierra DB
  fetchMutation(api.users.create.default, {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: emailAddresses[0].email_address,
    tokenIdentifier: tokenIdentifier ?? "",
  });
};

export default handleUserCreated;

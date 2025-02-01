import { WebhookEventType } from "@clerk/nextjs/server";
import handleUserCreated from "./user/user.created";
import { log } from "node:console";
import handleUserDeleted from "./user/user.deleted";

type Event = Partial<WebhookEventType>;
type EventResponse = Promise<void>;

const dispatcher: {
  [key in Event]?: (payload: any) => EventResponse;
} = {
  "user.created": handleUserCreated,
  "user.deleted": handleUserDeleted,
};

export const dispatchEvent = async (event: Event, payload: any) => {
  const handler = dispatcher[event];

  log(`ℹ️ Dispatching event ${event} with payload:`, payload);
  log(`ℹ️ Handler for event ${event}:`, handler);

  if (handler) {
    try {
      return handler(payload);
    } catch (error) {
      console.error(`Error handling event ${event}:`, error);
      throw error;
    }
  }

  throw new Error(`No handler found for event ${event}`, {
    cause: "NoHandlerFound",
  });
};

export default dispatcher;

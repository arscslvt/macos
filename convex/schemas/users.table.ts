import { defineTable } from "convex/server";
import { v } from "convex/values";

export default defineTable({
  firstName: v.string(),
  lastName: v.optional(v.string()),
  email: v.optional(v.string()),
  username: v.optional(v.string()),
  avatar: v.optional(v.string()),
  phone: v.optional(v.string()),
  address: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  zip: v.optional(v.string()),
  country: v.optional(v.string()),
  bio: v.optional(v.string()),
  website: v.optional(v.string()),

  // Clerk User ID
  tokenIdentifier: v.optional(v.string()),
})
  .index("by_token", ["tokenIdentifier"])
  .index("by_email", ["email"])
  .index("by_username", ["username"]);

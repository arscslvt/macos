import { mutation } from "../_generated/server";
import { v } from "convex/values";

const args = {
  firstName: v.string(),
  lastName: v.optional(v.string()),
  email: v.optional(v.string()),
  avatar: v.optional(v.string()),
  phone: v.optional(v.string()),
  address: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  zip: v.optional(v.string()),
  country: v.optional(v.string()),
  bio: v.optional(v.string()),
  website: v.optional(v.string()),
  tokenIdentifier: v.optional(v.string()),
};

export default mutation({
  args,
  handler: async (ctx, args) => {
    const {
      firstName,
      lastName,
      email,
      avatar,
      phone,
      address,
      city,
      state,
      zip,
      country,
      bio,
      website,
      tokenIdentifier,
    } = args;

    await ctx.db.insert("users", {
      firstName,
      lastName,
      email,
      avatar,
      phone,
      address,
      city,
      state,
      zip,
      country,
      bio,
      website,
      tokenIdentifier,
    });
  },
});

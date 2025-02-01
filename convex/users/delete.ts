import { mutation } from "../_generated/server";
import { v } from "convex/values";

const args = {
  tokenIdentifier: v.string(),
};

export default mutation({
  args,
  handler: async (ctx, args) => {
    const { tokenIdentifier } = args;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found", { cause: "UserNotFound" });

    await ctx.db.delete(user._id);
  },
});

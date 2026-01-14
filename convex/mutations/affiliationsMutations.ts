import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addAffiliation = mutation({
  args: {
    storageId: v.string(),
    affiliationTitle: v.string(),
    affiliationLink: v.string(),
    affiliationRole: v.array(v.string()),
  },
  handler: async (ctx, args) => {

    const imageUrl = await ctx.storage.getUrl(args.storageId);

    if (!imageUrl) {
      throw new Error("Failed to generate image URL from storageId");
    }

    const id = await ctx.db.insert("affiliations", {
      affiliationImage: imageUrl,
      affiliationTitle: args.affiliationTitle,
      affiliationLink: args.affiliationLink,
      affilitationRole: args.affiliationRole,
    });
    return id;
  }
});

export const editAffiliation = mutation({
  args: {
    id: v.id("affiliations"),
    storageId: v.optional(v.string()), // Optional - only if changing image
    affiliationTitle: v.string(),
    affiliationLink: v.string(),
    affiliationRole: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, storageId, affiliationTitle, affiliationLink, affiliationRole } = args;
    
    // If a new storageId is provided, generate new image URL and update with image
    if (storageId) {
      const imageUrl = await ctx.storage.getUrl(storageId);
      if (!imageUrl) {
        throw new Error("Failed to generate image URL from new storageId");
      }
      
      // Update with new image
      await ctx.db.patch(id, {
        affiliationTitle,
        affiliationLink,
        affilitationRole: affiliationRole,
        affiliationImage: imageUrl,
      });
    } else {
      // Update without changing image
      await ctx.db.patch(id, {
        affiliationTitle,
        affiliationLink,
        affilitationRole: affiliationRole,
      });
    }
    
    return { success: true };
  }
});

export const deleteAffiliation = mutation({
  args: {
    id: v.id("affiliations"),
  },
  handler: async (ctx, args) => {
    // TODO: Optionally delete the associated image from storage
    // const affiliation = await ctx.db.get(args.id);
    // if (affiliation?.affiliationImage) {
    //   await ctx.storage.delete(storageId);
    // }
    
    await ctx.db.delete(args.id);
    return { success: true };
  }
});
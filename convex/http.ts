import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

// Create the HTTP router
const http = httpRouter();

// Simple ping endpoint
http.route({
  path: "/ping",
  method: "GET",
  handler: httpAction(async () => {
    return new Response("pong", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

http.route({
  path: "/get-affiliations",
  method: "GET",
  handler: httpAction(async (ctx) => {
    // Run the query we created in step 1
    const affiliations = await ctx.runQuery(api.queries.affiliationsQueries.getAll);

    return new Response(JSON.stringify(affiliations), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

// Generate upload URL for file storage
http.route({
  path: "/generate-upload-url",
  method: "POST",
  handler: httpAction(async (ctx) => {
    try {
      const uploadUrl = await ctx.storage.generateUploadUrl();
      
      return new Response(JSON.stringify({ 
        uploadUrl: uploadUrl 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Failed to generate upload URL",
        details: error 
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

// Add new affiliation
http.route({
  path: "/add-affiliation",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { storageId, affiliationTitle, affiliationLink, affiliationRole } = body;
      
      if (!storageId || !affiliationTitle || !affiliationLink || !affiliationRole) {
        return new Response(JSON.stringify({ 
          error: "Missing required fields" 
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
      
      const affiliationId = await ctx.runMutation(api.mutations.affiliationsMutations.addAffiliation, {
        storageId,
        affiliationTitle,
        affiliationLink,
        affiliationRole,
      });
      
      return new Response(JSON.stringify({ 
        success: true,
        id: affiliationId 
      }), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Failed to add affiliation",
        details: error 
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

// Edit existing affiliation
http.route({
  path: "/edit-affiliation",
  method: "PUT",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { id, storageId, affiliationTitle, affiliationLink, affiliationRole } = body;
      
      if (!id || !affiliationTitle || !affiliationLink || !affiliationRole) {
        return new Response(JSON.stringify({ 
          error: "Missing required fields (id, affiliationTitle, affiliationLink, affiliationRole)" 
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
      
      const result = await ctx.runMutation(api.mutations.affiliationsMutations.editAffiliation, {
        id,
        storageId: storageId || null, // Optional - if provided, update image
        affiliationTitle,
        affiliationLink,
        affiliationRole,
      });
      
      return new Response(JSON.stringify({ 
        success: true,
        result: result 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Failed to edit affiliation",
        details: error 
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

// Delete affiliation
http.route({
  path: "/delete-affiliation",
  method: "DELETE",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { id } = body;
      
      if (!id) {
        return new Response(JSON.stringify({ 
          error: "Missing required field: id" 
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
      
      await ctx.runMutation(api.mutations.affiliationsMutations.deleteAffiliation, {
        id,
      });
      
      return new Response(JSON.stringify({ 
        success: true,
        message: "Affiliation deleted successfully" 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Failed to delete affiliation",
        details: error 
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});


export default http;

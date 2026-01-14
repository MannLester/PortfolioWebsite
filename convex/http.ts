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

// Get file URL from storage ID
http.route({
  path: "/get-file-url",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const { storageId } = await request.json();
      
      if (!storageId) {
        return new Response(JSON.stringify({ 
          error: "Missing storageId" 
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
      
      const fileUrl = await ctx.storage.getUrl(storageId);
      
      return new Response(JSON.stringify({ 
        fileUrl: fileUrl 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: "Failed to get file URL",
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

http.route({
  path: "/get-experiences",
  method: "GET",
  handler: httpAction(async (ctx) => {
    // Run the query we created in step 1
    const experiences = await ctx.runQuery(api.queries.experienceQueries.getAll);
    return new Response(JSON.stringify(experiences), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

// Add new experience
http.route({
  path: "/add-experience",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // 1. Parse the JSON body sent from Flutter
    const body = await request.json();

    try {
      // 2. Run the mutation using the correct path
      const result = await ctx.runMutation(api.mutations.experienceMutations.addExperiences, {
        experienceRole: body.experienceRole,
        experienceCompany: body.experienceCompany,
        experienceDesc: body.experienceDesc,
        experienceTasks: body.experienceTasks,
        experienceStartDate: body.experienceStartDate,
        experienceEndDate: body.experienceEndDate,
        experienceLocation: body.experienceLocation,
        experienceTechStack: body.experienceTechStack,
      });

      // 3. Return the success response with the new document ID
      return new Response(JSON.stringify({ id: result }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

http.route({
  path: "/update-experience",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    try {
      await ctx.runMutation(api.mutations.experienceMutations.updateExperience, body);
      return new Response(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

http.route({
  path: "/delete-experience",
  method: "POST", // Using POST for simplicity with request bodies in Flutter
  handler: httpAction(async (ctx, request) => {
    const { id } = await request.json();
    try {
      await ctx.runMutation(api.mutations.experienceMutations.deleteExperience, { id });
      return new Response(JSON.stringify({ deleted: id }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

http.route({
  path: "/get-skills",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const skills = await ctx.runQuery(api.queries.skillsQueries.getAll);

    return new Response(JSON.stringify(skills), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

http.route({
  path: "/add-skill",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    try {
      const id = await ctx.runMutation(api.mutations.skillsMutations.addSkills, body);
      return new Response(JSON.stringify({ id }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  }),
});

http.route({
  path: "/update-skill",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    try {
      await ctx.runMutation(api.mutations.skillsMutations.updateSkills, body);
      return new Response(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  }),
});

http.route({
  path: "/delete-skill",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { id } = await request.json();
    try {
      await ctx.runMutation(api.mutations.skillsMutations.deleteSkills, { id });
      return new Response(JSON.stringify({ deleted: id }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  }),
});

// Projects routes
http.route({
  path: "/get-projects",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const projects = await ctx.runQuery(api.queries.projectsQueries.getAll);
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

http.route({
  path: "/add-project",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    try {
      const id = await ctx.runMutation(api.mutations.projectsMutations.addProject, {
        projectTitle: body.projectTitle,
        projectDesc: body.projectDesc,
        projectField: body.projectField,
        projectTech: body.projectTech,
        isDeployed: body.isDeployed,
        projectLiveLink: body.projectLiveLink,
        projectGithubLink: body.projectGithubLink,
        projectImageUrl: body.projectImageUrl,
      });
      return new Response(JSON.stringify({ id }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

http.route({
  path: "/update-project",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    try {
      await ctx.runMutation(api.mutations.projectsMutations.updateProject, body);
      return new Response(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

http.route({
  path: "/delete-project",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { id } = await request.json();
    try {
      await ctx.runMutation(api.mutations.projectsMutations.deleteProject, { id });
      return new Response(JSON.stringify({ deleted: id }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
});

export default http;

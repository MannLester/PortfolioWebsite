import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { GitHubService } from "@/lib/github-service";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface SyncResult {
  success: boolean;
  message: string;
  syncedCount?: number;
  errors?: string[];
}

export async function syncGitHubRepositories(
  githubToken: string, 
  githubUsername: string, 
  repoType: 'all' | 'public' | 'private' = 'all'
): Promise<SyncResult> {
  try {
    const githubService = new GitHubService(githubToken, githubUsername);
    
    // Fetch repositories based on type
    let repositories;
    switch (repoType) {
      case 'public':
        repositories = await githubService.getPublicRepositories();
        break;
      case 'private':
        repositories = await githubService.getPrivateRepositories();
        break;
      default:
        repositories = await githubService.getAllRepositories();
    }
    
    console.log(`Found ${repositories.length} ${repoType} repositories`);

    const errors: string[] = [];
    let syncedCount = 0;
    let skippedCount = 0;

    // Process each repository
    for (const repo of repositories) {
      try {
        console.log(`Processing repository: ${repo.name}`);
        
        // Check if project already exists in database
        const exists = await convex.query(api.projects.projectExists, { github_id: repo.id });
        
        if (exists) {
          console.log(`⏩ Skipped: ${repo.name} (already in database)`);
          skippedCount++;
          continue;
        }
        
        const processedRepo = await githubService.processRepository(repo);
        
        // Insert new project only (no updates)
        const result = await convex.mutation(api.projects.insertNewProject, processedRepo);
        
        if (result.success) {
          syncedCount++;
          console.log(`✅ Added: ${repo.name}`);
        } else {
          console.log(`⏩ Skipped: ${repo.name} (${result.message})`);
          skippedCount++;
        }
      } catch (error) {
        const errorMessage = `Failed to process ${repo.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(errorMessage);
        errors.push(errorMessage);
      }
    }

    return {
      success: true,
      message: `Sync complete: ${syncedCount} new projects added, ${skippedCount} existing projects skipped, ${repositories.length} total repositories processed`,
      syncedCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    console.error('GitHub sync failed:', error);
    return {
      success: false,
      message: `GitHub sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Function to sync a single repository (for incremental updates)
export async function syncSingleRepository(githubToken: string, githubUsername: string, repoName: string): Promise<SyncResult> {
  try {
    const githubService = new GitHubService(githubToken, githubUsername);
    
    // Get all repos to find the specific one
    const repositories = await githubService.getAllRepositories();
    const targetRepo = repositories.find(repo => repo.name === repoName);
    
    if (!targetRepo) {
      return {
        success: false,
        message: `Repository "${repoName}" not found`,
      };
    }

    // Check if project already exists in database
    const exists = await convex.query(api.projects.projectExists, { github_id: targetRepo.id });
    
    if (exists) {
      return {
        success: false,
        message: `Repository "${repoName}" already exists in database. Use admin panel to edit manually.`,
      };
    }

    const processedRepo = await githubService.processRepository(targetRepo);
    const result = await convex.mutation(api.projects.insertNewProject, processedRepo);

    if (result.success) {
      return {
        success: true,
        message: `Successfully added new repository: ${repoName}`,
        syncedCount: 1,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  } catch (error) {
    console.error('Single repo sync failed:', error);
    return {
      success: false,
      message: `Failed to sync ${repoName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
"use client";

import { useState } from "react";
import { syncGitHubRepositories } from "@/lib/sync-github";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface SyncResult {
  success: boolean;
  message: string;
  errors?: string[];
}

export default function AdminPage() {
  const [githubToken, setGithubToken] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [repoType, setRepoType] = useState<'all' | 'public' | 'private'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);

  const projects = useQuery(api.projects.getAllProjects);

  const handleSync = async () => {
    if (!githubToken || !githubUsername) {
      alert("Please provide both GitHub token and username");
      return;
    }

    setIsLoading(true);
    setSyncResult(null);

    try {
      const result = await syncGitHubRepositories(githubToken, githubUsername, repoType);
      setSyncResult(result);
    } catch (error) {
      setSyncResult({
        success: false,
        message: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Portfolio Admin Panel</h1>
        
        {/* GitHub Sync Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">GitHub Repository Sync</h2>
          <p className="text-sm text-gray-600 mb-4">
            This will only add <strong>NEW</strong> repositories that aren&apos;t already in your database. 
            Existing projects will be skipped to preserve your manual edits.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-blue-800 mb-1">GitHub Token Requirements:</h4>
            <ul className="text-sm text-blue-700">
              <li>• <strong>repo</strong> scope - Required for accessing private repositories</li>
              <li>• <strong>read:user</strong> scope - Required for user information</li>
              <li>• Create token at: <a href="https://github.com/settings/tokens" target="_blank" className="underline">github.com/settings/tokens</a></li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="your-github-username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Personal Access Token
              </label>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository Type
              </label>
              <select
                value={repoType}
                onChange={(e) => setRepoType(e.target.value as 'all' | 'public' | 'private')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Repositories</option>
                <option value="public">Public Only</option>
                <option value="private">Private Only</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={handleSync}
            disabled={isLoading || !githubToken || !githubUsername}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Syncing..." : "Sync GitHub Repositories"}
          </button>
          
          {/* Sync Result */}
          {syncResult && (
            <div className={`mt-4 p-4 rounded-md ${syncResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <h3 className="font-medium">{syncResult.success ? 'Success!' : 'Error!'}</h3>
              <p>{syncResult.message}</p>
              {syncResult.errors && syncResult.errors.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-medium">Errors:</h4>
                  <ul className="list-disc list-inside">
                    {syncResult.errors.map((error: string, index: number) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Projects Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Synced Projects ({projects?.length || 0})
          </h2>
          
          {projects && projects.length > 0 ? (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{project.proj_name}</h3>
                    <div className="flex gap-2">
                      {project.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                      )}
                      {project.isDeployed && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Deployed</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{project.proj_desc}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-700">Frontend</h4>
                      <ul className="text-gray-600">
                        {project.frontend_stack.map((lang, index) => (
                          <li key={index}>{lang.language} ({lang.percentage}%)</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Backend</h4>
                      <ul className="text-gray-600">
                        {project.backend_stack.map((lang, index) => (
                          <li key={index}>{lang.language} ({lang.percentage}%)</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Database</h4>
                      <ul className="text-gray-600">
                        {project.database_stack.map((lang, index) => (
                          <li key={index}>{lang.language} ({lang.percentage}%)</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-4 text-sm text-gray-500">
                    <span>⭐ {project.stars}</span>
                    <span>🍴 {project.forks}</span>
                    <span>👥 {project.collaborators?.length} collaborators</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No projects found. Sync your GitHub repositories to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
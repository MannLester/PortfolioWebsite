import { Octokit } from "@octokit/rest";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  default_branch: string;
  collaborators_url: string;
  languages_url: string;
}

interface LanguageData {
  [key: string]: number;
}

interface Collaborator {
  login: string;
  html_url: string;
}

export class GitHubService {
  private octokit: Octokit;
  private owner: string;

  constructor(token: string, owner: string) {
    this.octokit = new Octokit({
      auth: token,
    });
    this.owner = owner;
  }

  // Get all repositories (public and private)
  async getAllRepositories(): Promise<GitHubRepo[]> {
    try {
      // Use listForAuthenticatedUser to get private repos
      // This requires authentication and returns repos for the authenticated user
      const response = await this.octokit.rest.repos.listForAuthenticatedUser({
        visibility: 'all', // 'all', 'public', or 'private'
        affiliation: 'owner', // Only repos owned by the user
        sort: 'updated', // Sort by last updated
        per_page: 100,
      });
      
      return response.data as GitHubRepo[];
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  // Get only public repositories
  async getPublicRepositories(): Promise<GitHubRepo[]> {
    try {
      const response = await this.octokit.rest.repos.listForUser({
        username: this.owner,
        type: 'public',
        per_page: 100,
      });
      
      return response.data as GitHubRepo[];
    } catch (error) {
      console.error('Error fetching public repositories:', error);
      throw error;
    }
  }

  // Get only private repositories
  async getPrivateRepositories(): Promise<GitHubRepo[]> {
    try {
      const response = await this.octokit.rest.repos.listForAuthenticatedUser({
        visibility: 'private',
        affiliation: 'owner',
        sort: 'updated',
        per_page: 100,
      });
      
      return response.data as GitHubRepo[];
    } catch (error) {
      console.error('Error fetching private repositories:', error);
      throw error;
    }
  }

  // Get languages for a specific repository
  async getRepoLanguages(repoName: string): Promise<LanguageData> {
    try {
      const response = await this.octokit.rest.repos.listLanguages({
        owner: this.owner,
        repo: repoName,
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching languages for ${repoName}:`, error);
      return {};
    }
  }

  // Get collaborators for a specific repository
  async getRepoCollaborators(repoName: string): Promise<Collaborator[]> {
    try {
      const response = await this.octokit.rest.repos.listCollaborators({
        owner: this.owner,
        repo: repoName,
      });
      
      return response.data.map(collaborator => ({
        login: collaborator.login,
        html_url: collaborator.html_url,
      }));
    } catch (error) {
      console.error(`Error fetching collaborators for ${repoName}:`, error);
      return [];
    }
  }

  // Convert language data to percentage format
  static calculateLanguagePercentages(languages: LanguageData): Array<{language: string, percentage: number}> {
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    
    if (totalBytes === 0) return [];
    
    return Object.entries(languages)
      .map(([language, bytes]) => ({
        language,
        percentage: Math.round((bytes / totalBytes) * 100 * 100) / 100 // Round to 2 decimal places
      }))
      .sort((a, b) => b.percentage - a.percentage); // Sort by percentage desc
  }

  // Categorize languages into stacks
  static categorizeLanguages(languages: Array<{language: string, percentage: number}>) {
    const frontendLanguages = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SCSS', 'Less', 'Vue', 'React', 'Angular', 'Svelte', 'Dart', 'Swift', 'Kotlin'];
    const backendLanguages = ['Python', 'Java', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Node.js', 'C++', 'C', 'Scala', 'Elixir', 'Erlang'];
    const databaseLanguages = ['SQL', 'PLpgSQL', 'TSQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis'];

    return {
      frontend_stack: languages.filter(lang => 
        frontendLanguages.some(frontend => 
          lang.language.toLowerCase().includes(frontend.toLowerCase())
        )
      ),
      backend_stack: languages.filter(lang => 
        backendLanguages.some(backend => 
          lang.language.toLowerCase().includes(backend.toLowerCase())
        )
      ),
      database_stack: languages.filter(lang => 
        databaseLanguages.some(database => 
          lang.language.toLowerCase().includes(database.toLowerCase())
        )
      ),
    };
  }

  // Process a single repository to get all its data
  async processRepository(repo: GitHubRepo) {
    const [languages, collaborators] = await Promise.all([
      this.getRepoLanguages(repo.name),
      this.getRepoCollaborators(repo.name)
    ]);

    const languagePercentages = GitHubService.calculateLanguagePercentages(languages);
    const categorizedLanguages = GitHubService.categorizeLanguages(languagePercentages);

    return {
      github_id: repo.id,
      proj_name: repo.name,
      proj_desc: repo.description || '',
      proj_repo_link: repo.html_url,
      proj_deployed_link: repo.homepage || '',
      frontend_stack: categorizedLanguages.frontend_stack,
      backend_stack: categorizedLanguages.backend_stack,
      database_stack: categorizedLanguages.database_stack,
      collaborators: collaborators
        .filter(collab => collab.login !== this.owner) // Exclude the owner
        .map(collab => ({
          name: collab.login,
          github_link: collab.html_url
        })),
      isFeatured: false, // Default to false, you can manually set this later
      isDeployed: Boolean(repo.homepage), // Consider deployed if has homepage
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      topics: repo.topics,
      default_branch: repo.default_branch,
    };
  }
}
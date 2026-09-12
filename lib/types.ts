export type Profile = {
  login: string; name: string | null; avatar_url: string; bio: string | null;
  followers: number; public_repos: number; html_url: string; location: string | null;
};

export type Repo = {
  name: string; description: string | null; url: string; homepage: string | null;
  stars: number; forks: number; language: string | null; topics: string[];
  updatedAt: string;
};
import { Octokit } from "octokit";

export const USERNAME = process.env.GITHUB_USERNAME || "izganesh007-ship-it";

export function octokit() {
  // Token stays on the server. Without a token it still works (60 req/hr + caching).
  return new Octokit({ auth: process.env.GITHUB_TOKEN || undefined });
}
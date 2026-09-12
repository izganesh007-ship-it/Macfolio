import { NextResponse } from "next/server";
import { octokit, USERNAME } from "@/lib/github";

export const revalidate = 300;

export async function GET() {
  try {
    const { data } = await octokit().request("GET /users/{username}/repos", {
      username: USERNAME, per_page: 100, sort: "updated",
    });
    const repos = data
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        topics: r.topics ?? [],
        updatedAt: r.pushed_at ?? r.updated_at,
      }));
    return NextResponse.json(repos);
  } catch {
    return NextResponse.json({ error: "github_unreachable" }, { status: 502 });
  }
}
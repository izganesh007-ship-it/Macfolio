import { NextResponse } from "next/server";
import { octokit, USERNAME } from "@/lib/github";

export const revalidate = 300; // ISR cache - max 1 upstream call / 5 min

export async function GET() {
  try {
    const { data } = await octokit().request("GET /users/{username}", { username: USERNAME });
    return NextResponse.json({
      login: data.login, name: data.name, avatar_url: data.avatar_url, bio: data.bio,
      followers: data.followers, public_repos: data.public_repos,
      html_url: data.html_url, location: data.location,
    });
  } catch {
    return NextResponse.json({ error: "github_unreachable" }, { status: 502 });
  }
}
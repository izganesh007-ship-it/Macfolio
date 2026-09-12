import { NextResponse } from "next/server";
import { octokit, USERNAME } from "@/lib/github";

export const revalidate = 600;

export async function GET(req: Request) {
  const repo = new URL(req.url).searchParams.get("repo");
  if (!repo) return new NextResponse("missing repo", { status: 400 });
  try {
    // GitHub returns pre-rendered HTML for the README (your own repos - acceptable for a portfolio)
    const res = await octokit().request("GET /repos/{owner}/{repo}/readme", {
      owner: USERNAME, repo,
      headers: { accept: "application/vnd.github.html+json" },
    });
    return new NextResponse(String(res.data), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch {
    return new NextResponse("<p>No README found for this repo.</p>", {
      headers: { "content-type": "text/html" },
    });
  }
}
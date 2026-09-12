# MacFolio

macOS-style portfolio, live from GitHub. Dark + light mode, 3D wallpaper, draggable windows.

## Run locally
    npm install
    copy .env.local.example .env.local   # then paste your GitHub fine-grained PAT inside
    npm run dev

## Deploy (Vercel)
1. Push this folder to a GitHub repo
2. Vercel -> Import (framework auto-detected)
3. Add env var GITHUB_TOKEN (and GITHUB_USERNAME) -> Deploy

## Token safety
The token is only read server-side (app/api routes). It never reaches the browser.
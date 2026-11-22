# KelzStudio website

Install dependencies and run `npm run dev` locally. Validate changes with `npm run typecheck` and `npm run build`.
Content lives in `content/*.ts`; replace images in `public/shots` to update screenshots.

## Public downloads and counts

The download page reads GitHub Releases on the server and displays installer links and GitHub's per-asset `download_count`. Release metadata is cached for five minutes. Counts are GitHub's total asset download counts, not unique users or website visits.

**The release assets must be public for visitors to download them without a GitHub login.** Keep the application source repository private and publish only the built installers to a public release-only repository. A token that lets the website read a private release does not make its assets public.

Set the public release repository in the Vercel project's server-side environment variables:

- `GITHUB_REPOSITORY=OWNER/REPOSITORY` (defaults to `kelechi okpani/kelz-studio`), or
- `GITHUB_OWNER=OWNER` and `GITHUB_REPO=REPOSITORY`.

`GITHUB_TOKEN` is optional for public releases, but a fine-grained read-only token for the public repository avoids GitHub's lower unauthenticated API rate limit. If used, keep it server-side; never expose it through a `NEXT_PUBLIC_` variable. The website supports both repository setting styles and uses the latest stable release.

### Download button click counts

The download buttons also display and increment persistent click counts for Windows, macOS Intel, and Apple Silicon. These are website button clicks (recorded before redirecting to the installer), separate from GitHub's actual asset download counts. Generic macOS assets with no architecture label use a separate macOS count.

Set `DATABASE_URL` to a Neon PostgreSQL connection string in the local `.env.local` file and in the Vercel project's server-side environment variables. The site creates `kelzstudio_download_clicks` and its platform index on first use; each button click is stored with its platform, release version, asset name, and timestamp. Counts are read from the database, so they persist across deployments. Keep the connection string secret and never expose it through a `NEXT_PUBLIC_` variable.

When developing locally without `DATABASE_URL`, clicks are saved to `.data/download-clicks.json` instead of memory, so they survive page navigation and dev-server reloads. That local file is ignored by Git and is not shared with Vercel. Production requires `DATABASE_URL`; if tracking is unavailable, the download still starts and the page reports that the click could not be counted.

### Vercel deployment

1. Import the private website repository into Vercel and grant Vercel access to it.
2. Set the project root to the directory containing this `package.json`. Vercel should detect Next.js automatically; use `npm run build` as the build command.
3. Configure the production branch (for example, `main`) and add the release repository environment variable above to Production (and Preview if desired).
4. Deploy. Vercel will build and deploy website commits pushed to the connected branch. No `vercel.json` is required for this Next.js project.

Publishing a new application release is separate from deploying the website. The private application repository's release workflow must build the installers and publish them as assets to the public release-only repository. Once published, this site picks up the latest release and its counts after its cache refreshes; no website redeploy is needed.

GitHub Actions' default `GITHUB_TOKEN` is scoped to its own repository. Cross-repository publishing therefore needs a narrowly scoped GitHub App token or fine-grained token, stored as a secret in the **application** repository, with permission to publish releases to the public distribution repository. Do not put that publishing credential in the website or expose it to browsers.

## Optional direct download links

Server environment variables `DOWNLOAD_WINDOWS_URL`, `DOWNLOAD_MAC_ARM64_URL`, and `DOWNLOAD_MAC_INTEL_URL` can override GitHub assets with public HTTPS URLs. Optional variables are `DOWNLOAD_<WINDOWS|MAC_ARM64|MAC_INTEL>_FILENAME`, `_SIZE` (for example, `181 MB`), and `_CHECKSUM`, plus `DOWNLOAD_VERSION` and `DOWNLOAD_DATE` (`YYYY-MM-DD`). For GitHub download counts to correspond to the links shown, use the public GitHub Release asset URLs instead of overriding them.

## Other environment variables

Configure site metadata and contact links through `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_ISSUES_URL`, and `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits including country code) / `NEXT_PUBLIC_WHATSAPP_MESSAGE`. See `config/site.ts`.

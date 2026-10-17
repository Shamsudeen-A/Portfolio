const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPages = Boolean(process.env.GITHUB_PAGES === "true" && repoName && !repoName.endsWith(".github.io"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProjectPages ? `/${repoName}` : "",
  assetPrefix: isProjectPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProjectPages ? `/${repoName}` : ""
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;

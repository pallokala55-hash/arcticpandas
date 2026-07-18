import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // The parent repo (pandas.gg site) has its own lockfile — pin the root
    // so Next doesn't infer the wrong workspace.
    root: __dirname,
  },
};

export default nextConfig;

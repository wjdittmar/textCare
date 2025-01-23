import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    // Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    trailingSlash: true,
    // allow project to build in production with ESLint errors
    eslint: {
        ignoreDuringBuilds: true,
    },
    // allow project to build in production with ESLint errors
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;

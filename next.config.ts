import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    reactStrictMode: true,
    // Keep production output away from the live development assets in `.next`.
    // This prevents `next build` from invalidating CSS served by `next dev`.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-build"
  };
}

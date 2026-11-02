import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents (and PPR via partialPrefetching) replace the classic
  // `export const dynamic` segment config with a "use cache"-based model;
  // Slice 2's adapter targets the classic model (ISR/PPR are Slice 4
  // scope, via the x-nbo-ppr extension per docs/nbo-spec.md), so these
  // stay off until then.
  // Scaffolded with --no-agents-md; `next dev` otherwise regenerates
  // AGENTS.md on every run regardless of that flag.
  agentRules: false
};

export default nextConfig;

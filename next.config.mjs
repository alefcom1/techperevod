/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The design handoff bundle under project/ is reference material, not app
  // source — Next only compiles what's imported from src/, so it's ignored.
};

export default nextConfig;

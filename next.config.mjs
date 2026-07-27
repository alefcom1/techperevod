/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The design handoff bundle under project/ is reference material, not app
  // source — Next only compiles what's imported from src/, so it's ignored.

  // Файлы в /public не хешируются Next'ом, поэтому по умолчанию отдаются без
  // Cache-Control (PageSpeed: «Выбирайте эффективный период хранения кеша»).
  // Неделя + сутки stale-while-revalidate заметно ускоряет повторные визиты,
  // но не «замораживает» файл на год, если логотип/PDF позже обновится.
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/samples/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;

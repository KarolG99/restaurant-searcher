/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/:locale((?!en|pl).*)",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

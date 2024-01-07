/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ougzvwpufkwnvgoirbpe.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
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

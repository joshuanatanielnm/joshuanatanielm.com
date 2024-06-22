/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination: "https://resume.io/r/fyzF2RrFm",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

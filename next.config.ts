/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "placehold.co", // Add this line
      // Add other image domains here if you use them, e.g., 'example.com', 'another-cdn.net'
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PRIVATE_DOMAIN: process.env.NEXT_PUBLIC_PRIVATE_DOMAIN,
  },
};

module.exports = nextConfig;

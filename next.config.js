/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['studiolifeseattle.com','cdn.sanity.io', 'localhost', 'framer.com', 'partners.tawk.to', "studiolife.vercel.app"],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    urlImports: [
        "https://framer.com/m/",
        "https://framerusercontent.com/",
        "https://fonts.gstatic.com/",
        "https://fonts.googleapis.com/",
        "https://ga.jspm.io/",
        "https://jspm.dev/",
        "https://cdn.jsdelivr.net/"
    ],
  },
}

module.exports = nextConfig

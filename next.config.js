/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Opcional: para ignorar warnings de source maps
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        http2: false,
        tls: false,
    
      }
    }
    return config
  }
}

module.exports = nextConfig
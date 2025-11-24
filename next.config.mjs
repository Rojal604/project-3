/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/project-3',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

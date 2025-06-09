/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
  ignoreDuringBuilds: false,
},
typescript: {
  ignoreBuildErrors: true,
},
// Ensure Next.js image optimization is enabled
images: {
  // unoptimized: false, // Default is false, so this line is optional
},
}

export default nextConfig

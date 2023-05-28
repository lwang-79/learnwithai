/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Origin", value: "https://learn.jinpearl.com" },
  //         { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
  //         { key: "Access-Control-Allow-Headers", value: "Content-Type" },
  //       ]
  //     }
  //   ]
  // }
}

module.exports = nextConfig

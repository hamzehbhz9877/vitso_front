import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vitso.ir',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'randomuser.me',
                pathname: '/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

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
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'sabzlearn.ir',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'www.svgrepo.com',
                pathname: '/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

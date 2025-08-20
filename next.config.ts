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
            },{
                protocol: "https",
                hostname: "dl.vitso.ir",
                pathname: "/vitso/images/**",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

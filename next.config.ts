import type { NextConfig } from "next";
import packageJson from './package.json';

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
            },{
                protocol: "https",
                hostname: "dl.vitso.ir",
                pathname: "/verify.php",
            }
        ],
    },
    env: {
        NEXT_PUBLIC_VERSION: packageJson.version,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

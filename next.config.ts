import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};


module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                port: '',
                pathname: '/tcf-images/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'chibisafe.eucalytics.uk',
                port: '',
                pathname: '**',
                search: '',
            },
        ],
    },
}

export default nextConfig;

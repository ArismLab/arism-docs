/** @type {import('next').NextConfig} */

import nextMDX from '@next/mdx'
import { remarkPlugins, rehypePlugins, recmaPlugins } from './libs/mdx.mjs'

const withMDX = nextMDX({
    options: {
        remarkPlugins,
        rehypePlugins,
        recmaPlugins,
        providerImportSource: '@mdx-js/react',
    },
})

const nextConfig = {
    experimental: { serverActions: true },
    devIndicators: {
        buildActivity: false,
    },
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        scrollRestoration: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'uxwing.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: '',
            },
        ],
    },
}

export default withMDX(nextConfig)

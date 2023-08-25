/** @type {import('next').NextConfig} */
const nextConfig = () => {
    console.log('Loading Config')
    return {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'api.genshin.dev',
                },
            ],
        },
    }
}

module.exports = nextConfig
// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = () => {
    console.log('Loading Config')
    return {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'webstatic.hoyoverse.com',
                }, {
                    protocol: 'https',
                    hostname: 'upload-os-bbs.hoyolab.com'
                }, {
                    protocol: 'https',
                    hostname: 'bbs.hoyolab.com'
                }, {
                    protocol: 'https',
                    hostname: 'upload-static.hoyoverse.com'
                }
            ],
        },
    }
}

module.exports = nextConfig
// export default nextConfig

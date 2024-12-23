/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'webstatic.hoyoverse.com'
			},
			{
				protocol: 'https',
				hostname: 'upload-os-bbs.hoyolab.com'
			},
			{
				protocol: 'https',
				hostname: 'act-upload.hoyoverse.com'
			},
			{
				protocol: 'https',
				hostname: 'bbs.hoyolab.com'
			},
			{
				protocol: 'https',
				hostname: 'upload-static.hoyoverse.com'
			},
			{
				protocol: 'https',
				hostname: 'act-webstatic.hoyoverse.com'
			}
		]
	}
};

module.exports = nextConfig;

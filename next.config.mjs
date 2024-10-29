import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
    images: {
        domains: ["i.ibb.co", "ibb.co", "img.freepik.com", "lh3.googleusercontent.com"],
    },
};

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig);

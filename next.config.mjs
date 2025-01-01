import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  // Specify the custom output directory for build artifacts
  // distDir: 'dist',  

  images: {
    domains: [
       "i.ibb.co", "ibb.co", "img.freepik.com", "lh3.googleusercontent.com", "i.postimg.cc"
    ],
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',  // Redirect to the root page
        permanent: false,  // Temporary redirect
      },
    ];
  },
  
  reactStrictMode: false,
  // Optionally, you can set this for exporting static sites
  // output: 'export', // Uncomment if you're exporting static pages with `next export`
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

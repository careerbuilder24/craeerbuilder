// import withBundleAnalyzer from '@next/bundle-analyzer';
// // 3d64b0e9dee39ca593b9da32467663ee
// npx ngrok http 3000  
// const nextConfig = {
//   // Specify the custom output directory for build artifacts
//   // distDir: 'dist',  
// // output: "export",
// // 3d64b0e9dee39ca593b9da32467663ee
//   images: {
//     domains: [
//        "i.ibb.co", "i.ibb.co.com", "ibb.co", "img.freepik.com", "lh3.googleusercontent.com", "i.postimg.cc", "postimg.cc"
//     ],
//   },

//   async redirects() {
//     return [
//       {
//         source: '/home',
//         destination: '/',  // Redirect to the root page
//         permanent: false,  // Temporary redirect
//       },
//     ];
//   },
  
 
//   reactStrictMode: false,
//   // Optionally, you can set this for exporting static sites
//   // output: 'export', // Uncomment if you're exporting static pages with `next export`
// };


// export default withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })(nextConfig);


// second attempt

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  images: {
    domains: [
      "i.ibb.co", "i.ibb.co.com",  "lh3.googleusercontent.com", "ibb.co", "img.freepik.com", "lh3.googleusercontent.com", "i.postimg.cc", "postimg.cc"
    ],
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false,
      },
    ];
  },

  reactStrictMode: false,

 
  devIndicators: {
    buildActivity: false,
    
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

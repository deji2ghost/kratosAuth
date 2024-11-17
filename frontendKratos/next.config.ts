module.exports = {
  async rewrites() {
    return [
      {
        source: '/kratos/:path*',
        destination: 'https://jolly-margulis-d3u8m7e000.projects.oryapis.com/:path*',
      },
    ];
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.akkahotels.com', // Buraya resmin geldiği domaini yaz
        port: '',
        pathname: '/**', // Tüm alt klasörlere izin verir
      },
    ],
  },
};

export default nextConfig;

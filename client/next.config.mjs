/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // reactCompiler: true,
  allowedDevOrigins: ['192.168.1.165'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.akkahotels.com', // Buraya resmin geldiği domaini yaz
        port: '',
        pathname: '/**', // Tüm alt klasörlere izin verir
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Buraya resmin geldiği domaini yaz
        port: '',
        pathname: '/**', // Tüm alt klasörlere izin verir
      },
    ],
  },  
};

export default nextConfig;

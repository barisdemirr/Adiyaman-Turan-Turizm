const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5001';
const parsedUrl = new URL(apiUrl);

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
      {
        protocol: parsedUrl.protocol.replace(':', ''),
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        pathname: '/**',
      },
    ],
  },  
};

export default nextConfig;

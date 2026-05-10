/** @type {import('next').NextConfig} */
const nextConfig = {
  // 把你的區域網路 IP 加入白名單
  allowedDevOrigins: ['192.168.1.116'],
  
  // (如果你原本裡面還有寫其他設定，請保留它們，只要把上面那行加進去就好)
};

export default nextConfig;
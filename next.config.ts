

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pokiter.com', 'cdn-ali.moloagdsp.com', "taproad.io", "imgs.crazygames.com", "play-lh.googleusercontent.com", "www.onlinegames.io"], // 添加图片域名
  },
  eslint: {
    ignoreDuringBuilds: true, // 忽略构建时的 ESLint 错误
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(config);


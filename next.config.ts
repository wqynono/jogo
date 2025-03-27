

import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 const config: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cdn.pokiter.com'], // 添加图片域名
  },
  
};

   
  const withNextIntl = createNextIntlPlugin();
  export default withNextIntl(config);


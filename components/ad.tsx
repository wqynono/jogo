"use client"
import { usePathname } from "next/navigation"; // 使用新的导航API
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: { push: (config: object) => void }[];
  }
}

interface AdsBannerProps {
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive": boolean;
  "data-ad-layout"?: string;
}

const AdComponent = (props: AdsBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // 获取当前路径

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const loadAd = () => {
      if (!adRef.current) return;

      // 清除现有广告内容
      adRef.current.innerHTML = '';

      // 创建新的广告元素
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle adbanner-customize mt-2';
      ins.style.display = 'block';
      ins.dataset.adtest = 'on'; // 测试模式，生产环境应移除
      ins.dataset.adClient = 'ca-pub-1838470550408352';

      // 设置广告属性
      Object.entries(props).forEach(([key, value]) => {
        ins.setAttribute(key, value.toString()); // 直接使用setAttribute更可靠
      });

      adRef.current.appendChild(ins);

      // 尝试加载广告
      const tryLoadAd = () => {
        try {
          if (window.adsbygoogle) {
            window.adsbygoogle.push([{}]);
            console.log('广告加载成功');
          } else if (retryCount < maxRetries) {
            retryCount++;
            console.log(`广告脚本未就绪，重试 ${retryCount}/${maxRetries}`);
            setTimeout(tryLoadAd, 500 * retryCount);
          } else {
            console.error('广告加载失败：adsbygoogle未定义');
          }
        } catch (err) {
          console.error('广告加载错误:', err);
        }
      };

      // 初始尝试加载
      tryLoadAd();
    };

    // 初始加载
    loadAd();

    // 返回清理函数
    return () => {
      // 清除现有广告内容
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [pathname, props]); // 当路径或props变化时重新加载

  return (
    <div
      ref={adRef}
      key={`ad-${pathname}`} // 使用路径作为key的一部分确保路由变化时重新创建
    />
  );
};

export default AdComponent;
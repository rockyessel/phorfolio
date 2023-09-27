import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-[#0e141b] text-white font-moldyen'>
        <Main />
        <NextScript />
        <Script
          id='dsq-count-scr'
          src='//rockyessel.disqus.com/count.js'
          async
        ></Script>
      </body>
    </Html>
  );
}

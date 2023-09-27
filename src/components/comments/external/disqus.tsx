import Script from 'next/script';
import React from 'react';



const DisqusCommentsEngine = () => {

  return (
    <div id='disqus_thread'>
      <Script id='my-script'>
        {`
    var disqus_config = function () {
    this.page.url = document.location.href;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = document.location.href.split(".app")[1]; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
  
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://rockyessel.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();`}
      </Script>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href='https://disqus.com/?ref_noscript'>
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};

export default DisqusCommentsEngine;

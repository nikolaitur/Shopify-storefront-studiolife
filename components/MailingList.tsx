import Script from 'next/script';
import { Container, chakra } from '@chakra-ui/react';


export default function MailingList() {
  return (
    <Container maxW="container.lg" py={10} borderRadius="10px" bg="white">
      <Script
        strategy="afterInteractive"
        id="flodeskjs"
        dangerouslySetInnerHTML={{
          __html: `(function(w, d, t, h, s, n) {
            w.FlodeskObject = n;
            var fn = function() {
              (w[n].q = w[n].q || []).push(arguments);
            };
            w[n] = w[n] || fn;
            var f = d.getElementsByTagName(t)[0];
            var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
            var sm = d.createElement(t);
            sm.async = true;
            sm.type = 'module';
            sm.src = h + s + '.mjs' + v;
            f.parentNode.insertBefore(sm, f);
            var sn = d.createElement(t);
            sn.async = true;
            sn.noModule = true;
            sn.src = h + s + '.js' + v;
            f.parentNode.insertBefore(sn, f);
          })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');`,
        }}
      />
      <div id="fd-form-605ccaef568cfe29009980b4" />
      <Script
        strategy="lazyOnload"
        id="flodesk_body"
        dangerouslySetInnerHTML={{
          __html: `window.fd('form', {
              formId: '605ccaef568cfe29009980b4',
              containerEl: '#fd-form-605ccaef568cfe29009980b4'
            });`,
        }}
      />
    </Container>
  );
}

import { Inter } from 'next/font/google';
import './globals.css';
import { clientConfig } from '../config/client.config';
import Script from 'next/script';
import SafeHydrationGuard from '../components/SafeHydrationGuard';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata = {
  title: `${clientConfig.product.name} – ${clientConfig.theme.brandName}`,
  description: clientConfig.product.heroSubheadline,
  icons: {
    icon: [
      { url: '/images/tino/tino.png' },
      { url: '/favicon.ico' }
    ],
    apple: '/images/tino/tino.png',
    shortcut: '/images/tino/tino.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="hydration-error-shield" strategy="beforeInteractive">
          {`
            (function() {
              if (typeof window === 'undefined') return;

              // 1. Filter browser extension removeChild / insertBefore errors
              window.addEventListener('error', function(e) {
                if (e && e.message && (
                  e.message.indexOf("reading 'removeChild'") > -1 || 
                  e.message.indexOf("reading 'insertBefore'") > -1 || 
                  e.message.indexOf("removeChild") > -1
                )) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  return true;
                }
              }, true);

              // 2. Filter browser extension attribute injection (fdprocessedid, etc.)
              var origError = console.error;
              console.error = function() {
                var msg = arguments[0];
                if (typeof msg === 'string' && (
                  msg.indexOf('fdprocessedid') > -1 ||
                  msg.indexOf('did not match') > -1 ||
                  msg.indexOf("didn't match the client properties") > -1 ||
                  msg.indexOf('hydration-mismatch') > -1
                )) {
                  return;
                }
                origError.apply(console, arguments);
              };
            })();
          `}
        </Script>
        <SafeHydrationGuard />
        {children}
      </body>
    </html>
  );
}

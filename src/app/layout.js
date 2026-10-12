import { Inter } from 'next/font/google';
import './globals.css';
import { clientConfig } from '../config/client.config';
import SafeHydrationGuard from '../components/SafeHydrationGuard';
import Header from '../components/Header';

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
        <SafeHydrationGuard />
        <Header />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import LayoutHome from '../presentation/components/layouts/layoutHome';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comunidade do Caminho',
  description: 'Uma igreja Família na região do barreiro',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutHome>{children}</LayoutHome>
      </body>
    </html>
  );
}

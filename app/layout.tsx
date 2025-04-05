import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl pl-4"
            >
              <Image
                className="pl"
                src="/logo-light.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Sobre Nós
              </Link>
              <Link
                href="/#calendar"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Agenda
              </Link>
              <Link
                href="/#contact"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Contatos
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="w-full border-t bg-background py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Comunidade do Caminho. All
              rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

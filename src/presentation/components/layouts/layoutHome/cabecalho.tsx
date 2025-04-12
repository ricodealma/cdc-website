import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Cabecalho = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between pr-4">
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
  );
}

export default Cabecalho
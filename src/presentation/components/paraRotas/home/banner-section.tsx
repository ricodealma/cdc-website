import Link from 'next/link';
import React from 'react'

const BannerSection = () => {
  return (
    <section
      className="relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center"
      style={{
        backgroundImage: "url('/family.png?height=600&width=1200')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 p-6 rounded-lg text-white drop-shadow-lg">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Bem-vindo à Comunidade do Caminho
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Uma igreja e uma família
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="#mission"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Nossa Missão
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerSection
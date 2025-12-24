import Link from 'next/link';
import React from 'react'

const BannerSection = () => {
  return (
    <section
      className="relative w-full section-padding-y bg-cover bg-center"
      style={{
        backgroundImage: "url('/family.png?height=600&width=1200')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 container-responsive">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 p-6 rounded-lg text-white drop-shadow-lg">
            <h1 className="text-fluid-6xl font-bold tracking-tighter">
              Bem-vindo à Comunidade do Caminho
            </h1>
            <p className="mx-auto max-w-[700px] text-fluid-xl">
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
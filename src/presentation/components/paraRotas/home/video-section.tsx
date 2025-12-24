'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function VideoSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    const currentRef = videoRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="w-full section-padding-y bg-muted/30">
      <div className="container-responsive">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-fluid-4xl font-bold tracking-tighter">
              Nossa História
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-fluid-xl">
              Assista ao vídeo para conhecer nossa jornada e comunidade
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto pt-8" ref={videoRef}>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
              {isVisible && (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/gyhNgnAIo8o?autoplay=1&controls=1"
                  title="Reprodutor de vídeo do YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>

            {/* Botão de navegação */}
            <div className="mt-6 flex justify-center">
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
              >
                Saiba mais sobre nossa história
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

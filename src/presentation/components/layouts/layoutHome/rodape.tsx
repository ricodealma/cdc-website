import React from 'react'

const Rodape = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Comunidade do Caminho. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Rodape
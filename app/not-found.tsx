'use client';

import Link from 'next/link';
import { HiOutlineEmojiSad } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <HiOutlineEmojiSad className="h-24 w-24 text-muted-foreground/50" />
      <h1 className="mt-8 text-4xl font-bold tracking-tight">
        Página no encontrada
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Volver al Dashboard
      </Link>
    </div>
  );
}
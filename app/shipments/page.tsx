'use client';

import { HiOutlineCog } from 'react-icons/hi';

export default function ShipmentsPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative">
        <HiOutlineCog className="h-24 w-24 animate-spin text-muted-foreground/30" />
        <HiOutlineCog className="absolute left-12 top-12 h-12 w-12 animate-spin-reverse text-muted-foreground/20" />
      </div>
      <h1 className="mt-8 text-2xl font-semibold">Control de Envíos</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Esta sección está actualmente en desarrollo. Pronto podrás gestionar todos tus envíos desde aquí.
      </p>
    </div>
  );
}
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainLayout } from '@/components/layout/main-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alexander Depot - Sistema de Gestión de Almacenes',
  description: 'Sistema profesional de gestión de almacenes y metales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Verificar autenticación
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [pathname]); // Re-verificar cuando cambia la ruta

  // Si estamos en la página de login, no mostrar el sidebar
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background">
        {isAuthenticated && (
          <>
            {/* Sidebar para desktop - Fijo */}
            <div 
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              className="fixed left-0 top-0 z-30 hidden h-screen will-change-[width] md:block"
            >
              <Sidebar 
                expanded={isExpanded} 
                isMobile={false}
                onMobileClose={() => {}}
              />
            </div>

            {/* Sidebar móvil - Overlay */}
            <div 
              className={`fixed inset-0 z-50 bg-background transition-transform duration-300 md:hidden ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <Sidebar 
                expanded={true} 
                isMobile={true}
                onMobileClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </>
        )}

        {/* Contenido principal con padding para compensar el sidebar */}
        <main className={`flex-1 transition-[padding] duration-200 ease-in-out ${
          isAuthenticated ? 'md:pl-16' : ''
        }`}>
          {isAuthenticated && (
            /* Header móvil */
            <div className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-lg p-2 hover:bg-accent/50"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span className="text-lg font-semibold">Alexander Depot</span>
              <div className="w-10" /> {/* Spacer para centrar el título */}
            </div>
          )}

          {/* Contenido de la página */}
          <div className="h-full p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
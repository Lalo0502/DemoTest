'use client';

import { cn } from '@/lib/utils';
import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineOfficeBuilding,
  HiOutlineTruck,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineX,
  HiOutlineDocument,
} from 'react-icons/hi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: HiOutlineHome,
    href: '/dashboard',
    description: 'Vista general del sistema',
  },
  {
    title: 'Almacenes',
    icon: HiOutlineOfficeBuilding,
    href: '/warehouses',
    description: 'Administración de almacenes',
  },
  {
    title: 'Inventario',
    icon: HiOutlineCube,
    href: '/inventory',
    description: 'Gestión de inventario',
  },
  {
    title: 'Documentos',
    icon: HiOutlineDocument,
    href: '/documents',
    description: 'Gestión de documentos',
  },
  {
    title: 'Envíos',
    icon: HiOutlineTruck,
    href: '/shipments',
    description: 'Control de envíos',
  },
  {
    title: 'Órdenes',
    icon: HiOutlineClipboardList,
    href: '/orders',
    description: 'Gestión de órdenes',
  },
  {
    title: 'Usuarios',
    icon: HiOutlineUsers,
    href: '/users',
    description: 'Administración de usuarios',
  },
  {
    title: 'Configuración',
    icon: HiOutlineCog,
    href: '/settings',
    description: 'Ajustes del sistema',
  },
];

interface SidebarProps {
  expanded: boolean;
  isMobile: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ expanded, isMobile, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r bg-card shadow-sm',
        'transition-[width] duration-200 ease-in-out',
        expanded ? 'w-64' : 'w-16',
        isMobile && 'w-full md:w-64'
      )}
      aria-label="Barra lateral de navegación"
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link 
          href="/dashboard" 
          className="flex items-center space-x-3 overflow-hidden"
          aria-label="Ir al Dashboard"
        >
          <HiOutlineBuildingOffice2 
            className={cn(
              'h-6 w-6 text-primary shrink-0',
              'transition-transform duration-200',
              expanded ? 'transform-none' : 'scale-110'
            )} 
          />
          <span 
            className={cn(
              'font-semibold text-lg tracking-tight whitespace-nowrap',
              'transition-[transform,opacity] duration-200 ease-out',
              expanded || isMobile
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-4 absolute'
            )}
          >
            Alexander Depot
          </span>
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMobileClose}
          >
            <HiOutlineX className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const NavLink = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center rounded-lg px-3 py-2.5',
                'transition-all duration-200 ease-in-out',
                'hover:bg-accent/50 active:bg-accent/70',
                isActive 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground',
                !expanded && !isMobile && 'justify-center',
                (expanded || isMobile) && 'space-x-3'
              )}
              onClick={() => isMobile && onMobileClose()}
            >
              <div className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md',
                'transition-[transform,colors] duration-200',
                !expanded && !isMobile && 'transform hover:scale-105',
                isActive ? 'text-current' : 'group-hover:text-foreground'
              )}>
                <item.icon className="h-[18px] w-[18px]" />
              </div>
              <span
                className={cn(
                  'text-sm font-medium whitespace-nowrap',
                  'transition-[transform,opacity] duration-200 ease-out',
                  expanded || isMobile
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4 absolute'
                )}
              >
                {item.title}
              </span>
            </Link>
          );

          return isMobile ? (
            NavLink
          ) : expanded ? (
            NavLink
          ) : (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                {NavLink}
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="flex flex-col gap-1"
                sideOffset={10}
              >
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="border-t p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button 
              className={cn(
                'flex w-full items-center rounded-lg px-3 py-2.5',
                'text-muted-foreground transition-all duration-200',
                'hover:bg-destructive/10 hover:text-destructive',
                !expanded && !isMobile && 'justify-center',
                (expanded || isMobile) && 'space-x-3'
              )}
              aria-label="Cerrar Sesión"
              onClick={() => {
                handleLogout();
                isMobile && onMobileClose();
              }}
            >
              <div className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md',
                'transition-transform duration-200',
                !expanded && !isMobile && 'transform hover:scale-105'
              )}>
                <HiOutlineLogout className="h-[18px] w-[18px]" />
              </div>
              <span
                className={cn(
                  'text-sm font-medium whitespace-nowrap',
                  'transition-[transform,opacity] duration-200 ease-out',
                  expanded || isMobile
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4 absolute'
                )}
              >
                Cerrar Sesión
              </span>
            </button>
          </TooltipTrigger>
          {!isMobile && (
            <TooltipContent 
              side="right" 
              className="flex flex-col gap-1"
              sideOffset={10}
            >
              <p>Cerrar Sesión</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </aside>
  );
}
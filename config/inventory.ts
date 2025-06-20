import { HiOutlineCheck, HiOutlineClock, HiOutlineX } from 'react-icons/hi';
import { StatusType, MaterialType } from '@/types/inventory';

export const statusConfig = {
  approved: {
    color: 'bg-emerald-500',
    icon: HiOutlineCheck,
    label: 'Aprobado',
  },
  review: {
    color: 'bg-amber-500',
    icon: HiOutlineClock,
    label: 'En Revisión',
  },
  rejected: {
    color: 'bg-rose-500',
    icon: HiOutlineX,
    label: 'Rechazado',
  },
} as const;

export const materialColors: Record<MaterialType, string> = {
  Aluminio: 'text-sky-600 dark:text-sky-400',
  Cobre: 'text-amber-600 dark:text-amber-400',
};
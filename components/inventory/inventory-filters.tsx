import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineAdjustments } from 'react-icons/hi';
import { useState } from 'react';

interface InventoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  materialFilter: string;
  onMaterialFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function InventoryFilters({
  searchTerm,
  onSearchChange,
  materialFilter,
  onMaterialFilterChange,
  statusFilter,
  onStatusFilterChange,
}: InventoryFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex w-full sm:max-w-sm">
          <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5" />
          <Input
            placeholder="Buscar por referencia, cliente o proveedor..."
            className="pl-9 sm:pl-10 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="ml-2 sm:hidden" size="icon">
                <HiOutlineAdjustments className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select value={materialFilter} onValueChange={onMaterialFilterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los materiales</SelectItem>
                      <SelectItem value="Aluminio">Aluminio</SelectItem>
                      <SelectItem value="Cobre">Cobre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="approved">Aprobado</SelectItem>
                      <SelectItem value="review">En Revisión</SelectItem>
                      <SelectItem value="rejected">Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex items-center gap-2">
            <HiOutlineFilter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtrar por:</span>
          </div>
          <Select value={materialFilter} onValueChange={onMaterialFilterChange}>
            <SelectTrigger className="w-[160px] sm:w-[180px]">
              <SelectValue placeholder="Material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los materiales</SelectItem>
              <SelectItem value="Aluminio">Aluminio</SelectItem>
              <SelectItem value="Cobre">Cobre</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-[160px] sm:w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="approved">Aprobado</SelectItem>
              <SelectItem value="review">En Revisión</SelectItem>
              <SelectItem value="rejected">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
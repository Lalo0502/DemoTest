'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HiOutlineDotsVertical, HiOutlineEye, HiOutlinePhotograph, HiOutlinePencil, HiOutlineClock, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { InventoryEntry } from '@/types/inventory';
import { statusConfig, materialColors } from '@/config/inventory';
import { useState } from 'react';

interface InventoryTableProps {
  data: InventoryEntry[];
  onEntrySelect: (entry: InventoryEntry) => void;
  onEntryEdit: (entry: InventoryEntry) => void;
  onEntryPhotos: (entry: InventoryEntry) => void;
}

export function InventoryTable({ data, onEntrySelect, onEntryEdit, onEntryPhotos }: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const formatDateTime = (date: Date) => {
    return format(date, "d 'de' MMMM, yyyy HH:mm", { locale: es });
  };

  const formatDate = (date: Date) => {
    return format(date, "d 'de' MMMM, yyyy", { locale: es });
  };

  // Calcular paginación
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  // Generar array de páginas para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col">
      {/* Vista móvil */}
      <div className="space-y-3 sm:hidden">
        {currentData.map((entry) => {
          const status = statusConfig[entry.status];
          return (
            <Card
              key={entry.id}
              className="overflow-hidden"
              onClick={() => onEntrySelect(entry)}
            >
              <div className="border-b border-border/50 bg-muted/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{entry.reference}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <HiOutlineDotsVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEntrySelect(entry);
                      }}>
                        <HiOutlineEye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEntryPhotos(entry);
                      }}>
                        <HiOutlinePhotograph className="mr-2 h-4 w-4" />
                        Ver fotos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEntryEdit(entry);
                      }}>
                        <HiOutlinePencil className="mr-2 h-4 w-4" />
                        Editar entrada
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <HiOutlineClock className="h-4 w-4" />
                  <span>{formatDate(entry.receptionDate)}</span>
                </div>
              </div>
              <div className="space-y-3 p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Cliente</p>
                    <p className="mt-0.5 font-medium">{entry.client}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Proveedor</p>
                    <p className="mt-0.5 font-medium">{entry.supplier}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Material</p>
                    <p className={`mt-0.5 font-medium ${materialColors[entry.material]}`}>
                      {entry.material}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="mt-0.5 font-medium">{entry.cargoType}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Bultos</p>
                    <p className="mt-0.5 font-medium tabular-nums">
                      {entry.packages.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Peso</p>
                    <p className="mt-0.5 font-medium tabular-nums">
                      {entry.weight.toLocaleString()} kg
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${status.color}`} />
                  <span className="text-sm font-medium">{status.label}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Vista desktop */}
      <div className="hidden h-full overflow-auto rounded-lg border sm:block">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="whitespace-nowrap font-semibold">Fecha de Recepción</TableHead>
                <TableHead className="font-semibold">Referencia</TableHead>
                <TableHead className="font-semibold">Cliente</TableHead>
                <TableHead className="font-semibold">Proveedor</TableHead>
                <TableHead className="font-semibold">Material</TableHead>
                <TableHead className="font-semibold">Tipo</TableHead>
                <TableHead className="text-right font-semibold">Bultos</TableHead>
                <TableHead className="text-right font-semibold">Kilos</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">Fecha de Cruce</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((entry) => {
                const status = statusConfig[entry.status];
                return (
                  <TableRow 
                    key={entry.id} 
                    className="group cursor-pointer hover:bg-muted/50"
                    onClick={() => onEntrySelect(entry)}
                  >
                    <TableCell className="whitespace-nowrap">
                      {formatDateTime(entry.receptionDate)}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{entry.reference}</span>
                    </TableCell>
                    <TableCell>{entry.client}</TableCell>
                    <TableCell>{entry.supplier}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${materialColors[entry.material]}`}>
                        {entry.material}
                      </span>
                    </TableCell>
                    <TableCell>{entry.cargoType}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {entry.packages.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {entry.weight.toLocaleString()} kg
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateTime(entry.crossingDate)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2.5 w-2.5 rounded-full ${status.color}`} />
                        <status.icon className={`h-4 w-4 ${status.color} text-white`} />
                      </div>
                    </TableCell>
                    <TableCell className="w-[50px] p-2">
                      <div className="invisible flex justify-end group-hover:visible">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <HiOutlineDotsVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onEntrySelect(entry);
                            }}>
                              <HiOutlineEye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onEntryPhotos(entry);
                            }}>
                              <HiOutlinePhotograph className="mr-2 h-4 w-4" />
                              Ver fotos
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onEntryEdit(entry);
                            }}>
                              <HiOutlinePencil className="mr-2 h-4 w-4" />
                              Editar entrada
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Mostrar</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>por página</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, data.length)} de {data.length}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <HiOutlineChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <HiOutlineChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
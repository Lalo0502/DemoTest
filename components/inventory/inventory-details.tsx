'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HiOutlineTruck, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineCurrencyDollar, HiOutlinePencil, HiOutlinePhotograph } from 'react-icons/hi';
import { InventoryEntry } from '@/types/inventory';
import { statusConfig, materialColors } from '@/config/inventory';

interface InventoryDetailsProps {
  entry: InventoryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (entry: InventoryEntry) => void;
  onViewPhotos: (entry: InventoryEntry) => void;
}

export function InventoryDetails({ entry, open, onOpenChange, onEdit, onViewPhotos }: InventoryDetailsProps) {
  if (!entry) return null;

  const formatDateTime = (date: Date) => {
    return format(date, "d 'de' MMMM, yyyy HH:mm", { locale: es });
  };

  const status = statusConfig[entry.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detalles de la Entrada
          </DialogTitle>
          <DialogDescription>
            Información completa del registro {entry.reference}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="general" className="text-xs md:text-sm">
              <HiOutlineTruck className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Datos Generales</span>
              <span className="md:hidden">General</span>
            </TabsTrigger>
            <TabsTrigger value="lot" className="text-xs md:text-sm">
              <HiOutlineClipboardList className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Lote</span>
              <span className="md:hidden">Lote</span>
            </TabsTrigger>
            <TabsTrigger value="cargo" className="text-xs md:text-sm">
              <HiOutlineDocumentText className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Mercancía</span>
              <span className="md:hidden">Mercancía</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-xs md:text-sm">
              <HiOutlineCurrencyDollar className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Financiera</span>
              <span className="md:hidden">Financiera</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Recepción y Transporte</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Fecha y Hora de Recepción</p>
                  <p className="text-sm font-medium md:text-base">{formatDateTime(entry.receptionDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Tipo de Transporte</p>
                  <p className="text-sm font-medium md:text-base">{entry.transportType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">
                    {entry.transportType === 'Camión' ? 'Placas del Vehículo' : 'Número del Furgón'}
                  </p>
                  <p className="text-sm font-medium md:text-base">{entry.vehicleId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Número de Caja</p>
                  <p className="text-sm font-medium md:text-base">{entry.containerNumber}</p>
                </div>
              </div>
            </div>

            {entry.photos && entry.photos.length > 0 && (
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold md:text-lg">Fotografías</h3>
                  <Button variant="outline" size="sm" onClick={() => onViewPhotos(entry)}>
                    <HiOutlinePhotograph className="mr-2 h-4 w-4" />
                    Ver Fotos
                  </Button>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {entry.photos.slice(0, 2).map((photo, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border">
                      <img
                        src={`${photo}?auto=format&fit=crop&w=400&h=200`}
                        alt={`Foto ${index + 1}`}
                        className="aspect-[2/1] w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lot" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Información del Lote</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Referencia</p>
                  <p className="text-sm font-medium md:text-base">{entry.reference}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Cliente</p>
                  <p className="text-sm font-medium md:text-base">{entry.client}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Proveedor</p>
                  <p className="text-sm font-medium md:text-base">{entry.supplier}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Línea</p>
                  <p className="text-sm font-medium md:text-base">{entry.line}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Pedimento</p>
                  <p className="text-sm font-medium md:text-base">{entry.customsDeclaration}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Fecha de Pago</p>
                  <p className="text-sm font-medium md:text-base">
                    {format(entry.paymentDate, "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Tipo de Cambio</p>
                  <p className="text-sm font-medium md:text-base">${entry.exchangeRate.toFixed(2)} MXN</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cargo" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Información de la Mercancía</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Material</p>
                  <p className={`text-sm font-medium md:text-base ${materialColors[entry.material]}`}>
                    {entry.material}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Tipo de Carga</p>
                  <p className="text-sm font-medium md:text-base">
                    {entry.cargoType}
                    {entry.material === 'Aluminio' && 
                     entry.cargoType === 'Cilindros' && 
                     ' (FTZ)'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Bultos</p>
                  <p className="text-sm font-medium tabular-nums md:text-base">
                    {entry.packages.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Peso Total</p>
                  <p className="text-sm font-medium tabular-nums md:text-base">
                    {entry.weight.toLocaleString()} kg
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Información Financiera y Aduanal</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Factura</p>
                  <p className="text-sm font-medium md:text-base">{entry.invoice}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Valor</p>
                  <p className="text-sm font-medium md:text-base">${entry.value.toLocaleString()} USD</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Fecha y Hora de Cruce</p>
                  <p className="text-sm font-medium md:text-base">{formatDateTime(entry.crossingDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground md:text-sm">Estado</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2.5 w-2.5 rounded-full ${status.color}`} />
                    <span className="text-sm font-medium md:text-base">
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {entry.notes && (
              <div className="rounded-lg border p-4">
                <h3 className="text-base font-semibold md:text-lg">Notas</h3>
                <p className="mt-2 text-sm md:text-base">{entry.notes}</p>
              </div>
            )}
          </TabsContent>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => onEdit(entry)}>
              <HiOutlinePencil className="mr-2 h-4 w-4" />
              Editar Entrada
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HiOutlineSave, HiOutlineX } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { InventoryEntry, EditFormData, StatusType, TransportType, MaterialType, CargoType } from '@/types/inventory';
import { statusConfig } from '@/config/inventory';
import { format } from 'date-fns';

interface InventoryEditProps {
  entry: InventoryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EditFormData) => void;
}

export function InventoryEdit({ entry, open, onOpenChange, onSave }: InventoryEditProps) {
  const [form, setForm] = useState<EditFormData>({});

  useEffect(() => {
    if (entry) {
      setForm({
        ...entry,
        receptionDate: format(entry.receptionDate, "yyyy-MM-dd'T'HH:mm"),
        paymentDate: format(entry.paymentDate, 'yyyy-MM-dd'),
        crossingDate: format(entry.crossingDate, "yyyy-MM-dd'T'HH:mm"),
      });
    }
  }, [entry]);

  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Editar Entrada
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                Modificar información del registro {entry.reference}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <HiOutlineX className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Estado */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Estado de la Entrada</h3>
            <div className="mt-3">
              <Select
                value={form.status}
                onValueChange={(value: StatusType) => 
                  setForm(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([value, config]) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${config.color}`} />
                        <span>{config.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recepción y Transporte */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Recepción y Transporte</h3>
            <div className="mt-3 grid gap-4">
              <div className="space-y-2">
                <Label>Fecha y Hora de Recepción</Label>
                <Input
                  type="datetime-local"
                  value={form.receptionDate}
                  onChange={(e) => 
                    setForm(prev => ({ 
                      ...prev, 
                      receptionDate: e.target.value 
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Transporte</Label>
                <Select
                  value={form.transportType}
                  onValueChange={(value: TransportType) => 
                    setForm(prev => ({ ...prev, transportType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de transporte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Camión">Camión</SelectItem>
                    <SelectItem value="Furgón">Furgón</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  {form.transportType === 'Camión' ? 'Placas del Vehículo' : 'Número del Furgón'}
                </Label>
                <Input
                  value={form.vehicleId}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, vehicleId: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Número de Caja</Label>
                <Input
                  value={form.containerNumber}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, containerNumber: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Información del Lote */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Información del Lote</h3>
            <div className="mt-3 grid gap-4">
              <div className="space-y-2">
                <Label>Referencia</Label>
                <Input
                  value={form.reference}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, reference: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Cliente</Label>
                <Input
                  value={form.client}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, client: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Proveedor</Label>
                <Input
                  value={form.supplier}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, supplier: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Línea</Label>
                <Input
                  value={form.line}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, line: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Pedimento</Label>
                <Input
                  value={form.customsDeclaration}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, customsDeclaration: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Pago</Label>
                <Input
                  type="date"
                  value={form.paymentDate}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, paymentDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Cambio (MXN)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.exchangeRate}
                  onChange={(e) => 
                    setForm(prev => ({ 
                      ...prev, 
                      exchangeRate: parseFloat(e.target.value) 
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Información de la Mercancía */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Información de la Mercancía</h3>
            <div className="mt-3 grid gap-4">
              <div className="space-y-2">
                <Label>Material</Label>
                <Select
                  value={form.material}
                  onValueChange={(value: MaterialType) => 
                    setForm(prev => ({ ...prev, material: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aluminio">Aluminio</SelectItem>
                    <SelectItem value="Cobre">Cobre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Carga</Label>
                <Select
                  value={form.cargoType}
                  onValueChange={(value: CargoType) => 
                    setForm(prev => ({ ...prev, cargoType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de carga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lingotes">Lingotes</SelectItem>
                    <SelectItem value="Sin Refinar">Sin Refinar</SelectItem>
                    <SelectItem value="Cilindros">Cilindros</SelectItem>
                    <SelectItem value="Catodos de Cobre">Catodos de Cobre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Bultos</Label>
                  <Input
                    type="number"
                    value={form.packages}
                    onChange={(e) => 
                      setForm(prev => ({ 
                        ...prev, 
                        packages: parseInt(e.target.value) 
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    value={form.weight}
                    onChange={(e) => 
                      setForm(prev => ({ 
                        ...prev, 
                        weight: parseInt(e.target.value) 
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información Financiera */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Información Financiera</h3>
            <div className="mt-3 grid gap-4">
              <div className="space-y-2">
                <Label>Factura</Label>
                <Input
                  value={form.invoice}
                  onChange={(e) => 
                    setForm(prev => ({ ...prev, invoice: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Valor (USD)</Label>
                <Input
                  type="number"
                  value={form.value}
                  onChange={(e) => 
                    setForm(prev => ({ 
                      ...prev, 
                      value: parseInt(e.target.value) 
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha y Hora de Cruce</Label>
                <Input
                  type="datetime-local"
                  value={form.crossingDate}
                  onChange={(e) => 
                    setForm(prev => ({ 
                      ...prev, 
                      crossingDate: e.target.value 
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Notas y Observaciones</h3>
            <div className="mt-3">
              <Textarea
                value={form.notes}
                onChange={(e) => 
                  setForm(prev => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Agregar notas o comentarios sobre la entrada..."
                className="h-32 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => onSave(form)}>
              <HiOutlineSave className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
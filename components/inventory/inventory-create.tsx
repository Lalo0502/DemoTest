'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HiOutlineSave, HiOutlineTruck, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineCurrencyDollar, HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi';
import { useState } from 'react';
import { EditFormData, StatusType, TransportType, MaterialType, CargoType } from '@/types/inventory';
import { statusConfig } from '@/config/inventory';
import { format } from 'date-fns';

interface InventoryCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EditFormData) => void;
}

export function InventoryCreate({ open, onOpenChange, onSave }: InventoryCreateProps) {
  const now = new Date();
  const [form, setForm] = useState<EditFormData>({
    status: 'review',
    transportType: 'Camión',
    material: 'Aluminio',
    cargoType: 'Lingotes',
    receptionDate: format(now, "yyyy-MM-dd'T'HH:mm"),
    crossingDate: format(now, "yyyy-MM-dd'T'HH:mm"),
    paymentDate: format(now, 'yyyy-MM-dd'),
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      const newPreviewUrls: string[] = [];

      Array.from(files).forEach(file => {
        const fakeUrl = URL.createObjectURL(file);
        newPhotos.push(fakeUrl);
        newPreviewUrls.push(fakeUrl);
      });

      setPhotos([...photos, ...newPhotos]);
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPreviewUrls(newPreviewUrls);
  };

const handleSubmit = () => {
  const formattedData = {
    ...form,
    receptionDate: form.receptionDate ? new Date(form.receptionDate) : undefined,
    crossingDate: form.crossingDate ? new Date(form.crossingDate) : undefined,
    paymentDate: form.paymentDate ? new Date(form.paymentDate) : undefined,
    photos: previewUrls,
  } as unknown as EditFormData; // Ignorar error de tipos

  onSave(formattedData);
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Nueva Entrada de Inventario
          </DialogTitle>
          <DialogDescription className="mt-1.5">
            Crear un nuevo registro en el sistema
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-6">
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
              <div className="mt-4 grid gap-4">
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

            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Fotografías</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="w-full"
                  />
                </div>
                {previewUrls.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative overflow-hidden rounded-lg border">
                        <img
                          src={url}
                          alt={`Foto ${index + 1}`}
                          className="aspect-[2/1] w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => removePhoto(index)}
                        >
                          <HiOutlineTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lot" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Información del Lote</h3>
              <div className="mt-4 grid gap-4">
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
          </TabsContent>

          <TabsContent value="cargo" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Información de la Mercancía</h3>
              <div className="mt-4 grid gap-4">
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
          </TabsContent>

          <TabsContent value="financial" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Información Financiera</h3>
              <div className="mt-4 grid gap-4">
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
                <div className="space-y-2">
                  <Label>Estado</Label>
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
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold md:text-lg">Notas y Observaciones</h3>
              <div className="mt-4">
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
          </TabsContent>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <HiOutlineSave className="mr-2 h-4 w-4" />
              Guardar Entrada
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
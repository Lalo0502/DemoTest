'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { InventoryEntry } from '@/types/inventory';

interface InventoryPhotosProps {
  entry: InventoryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InventoryPhotos({ entry, open, onOpenChange }: InventoryPhotosProps) {
  if (!entry?.photos?.length) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Fotos del Registro</DialogTitle>
          <DialogDescription>
            Fotografías del vehículo y la carga
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {entry.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={`${photo}?auto=format&fit=crop&w=800&h=400`}
                      alt={`Foto ${index + 1}`}
                      className="aspect-[2/1] w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Document } from '@/types/documents';
import { HiOutlineDocumentDownload, HiOutlineClipboardList } from 'react-icons/hi';

interface DocumentsPreviewProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentsPreview({ document, open, onOpenChange }: DocumentsPreviewProps) {
  if (!document) return null;

  const progress = Math.round(
    (document.checklist.completed.length / document.checklist.required.length) * 100
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {document.reference}
          </DialogTitle>
          <DialogDescription className="mt-1.5">
            Detalles del documento
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Tipo de Documento</p>
              <p className="mt-1 font-medium">{document.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Entrada de Inventario</p>
              <p className="mt-1 font-medium">{document.inventoryReference}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="mt-1 font-medium">{document.client}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fecha de Creación</p>
              <p className="mt-1 font-medium">
                {format(document.createdAt, "d 'de' MMMM, yyyy HH:mm", { locale: es })}
              </p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Checklist de Requisitos</h3>
              <div className="flex items-center gap-1.5 rounded-md bg-blue-100 px-2 py-1 dark:bg-blue-500/20">
                <HiOutlineClipboardList className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  {progress}% Completado
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {document.checklist.required.map((item, index) => {
                const isCompleted = document.checklist.completed.includes(item);
                return (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isCompleted ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className={isCompleted ? 'text-foreground' : 'text-muted-foreground'}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {document.notes && (
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Notas</h3>
              <p className="mt-2 text-sm text-muted-foreground">{document.notes}</p>
            </div>
          )}

          {document.fileUrl && (
            <div className="flex justify-end">
              <Button
                onClick={() => window.open(document.fileUrl, '_blank')}
              >
                <HiOutlineDocumentDownload className="mr-2 h-4 w-4" />
                Descargar Documento
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}